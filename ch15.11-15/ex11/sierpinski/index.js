// --- タイル分割ユーティリティ（index.jsから再利用） ---
class Tile {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  static *tiles(width, height, numRows, numCols) {
    let columnWidth = Math.ceil(width / numCols);
    let rowHeight = Math.ceil(height / numRows);

    for (let row = 0; row < numRows; row++) {
      let tileHeight =
        row < numRows - 1 ? rowHeight : height - rowHeight * (numRows - 1);
      for (let col = 0; col < numCols; col++) {
        let tileWidth =
          col < numCols - 1 ? columnWidth : width - columnWidth * (numCols - 1);
        yield new Tile(
          col * columnWidth,
          row * rowHeight,
          tileWidth,
          tileHeight
        );
      }
    }
  }
}

// --- Web Worker プール（index.jsから再利用） ---
class WorkerPool {
  constructor(numWorkers, workerSource) {
    this.idleWorkers = [];
    this.workQueue = [];
    this.workerMap = new Map();

    for (let i = 0; i < numWorkers; i++) {
      let worker = new Worker(workerSource);
      worker.onmessage = (message) => {
        this._workerDone(worker, null, message.data);
      };
      worker.onerror = (error) => {
        this._workerDone(worker, error, null);
      };
      this.idleWorkers[i] = worker;
    }
  }
  _workerDone(worker, error, response) {
    let [resolver, rejector] = this.workerMap.get(worker);
    this.workerMap.delete(worker);
    if (this.workQueue.length === 0) {
      this.idleWorkers.push(worker);
    } else {
      let [work, resolver2, rejector2] = this.workQueue.shift();
      this.workerMap.set(worker, [resolver2, rejector2]);
      worker.postMessage(work);
    }
    error === null ? resolver(response) : rejector(error);
  }
  addWork(work) {
    return new Promise((resolve, reject) => {
      if (this.idleWorkers.length > 0) {
        let worker = this.idleWorkers.pop();
        this.workerMap.set(worker, [resolve, reject]);
        worker.postMessage(work);
      } else {
        this.workQueue.push([work, resolve, reject]);
      }
    });
  }
}

// --- ページ状態（マンデルブロ版を参考に、密度を追加） ---
class PageState {
  static initialState() {
    const s = new PageState();
    // ビューポート中心とスケール（マンデルブロに合わせる）
    const side = 3; // 初期表示三角形の一辺（ワールド座標）
    const h = (side * Math.sqrt(3)) / 2;
    s.cx = 0; // 中心X
    s.cy = -h / 6; // 中心Y（重心がほぼ中央になるよう少し下げる）
    s.perPixel = 3 / window.innerHeight; // 縦方向3.0の範囲をフィット
    s.density = 0.4; // 1ピクセルあたりの点密度の目安（タイル内の点数に反映）
    s.side = side; // 三角形の一辺長
    return s;
  }

  static fromURL(url) {
    let s = new PageState();
    let u = new URL(url);
    s.cx = parseFloat(u.searchParams.get("cx"));
    s.cy = parseFloat(u.searchParams.get("cy"));
    s.perPixel = parseFloat(u.searchParams.get("pp"));
    s.density = parseFloat(u.searchParams.get("den"));
    s.side = parseFloat(u.searchParams.get("side"));
    return isNaN(s.cx) ||
      isNaN(s.cy) ||
      isNaN(s.perPixel) ||
      isNaN(s.density) ||
      isNaN(s.side)
      ? null
      : s;
  }
  toURL() {
    let u = new URL(window.location);
    u.searchParams.set("cx", this.cx);
    u.searchParams.set("cy", this.cy);
    u.searchParams.set("pp", this.perPixel);
    u.searchParams.set("den", this.density);
    u.searchParams.set("side", this.side);
    return u.href;
  }
}

const ROWS = 3,
  COLS = 4,
  NUMWORKERS = navigator.hardwareConcurrency || 2;

class SierpinskiCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.workerPool = new WorkerPool(NUMWORKERS, "sierpinskiWorker.js");

    this.tiles = null;
    this.pendingRender = null;
    this.wantsRerender = false;
    this.resizeTimer = null;

    // 入力イベント
    this.canvas.addEventListener("pointerdown", (e) => this.handlePointer(e));
    window.addEventListener("keydown", (e) => this.handleKey(e));
    window.addEventListener("resize", (e) => this.handleResize(e));
    window.addEventListener("popstate", (e) => this.setState(e.state, false));

    this.state = PageState.fromURL(window.location) || PageState.initialState();
    history.replaceState(this.state, "", this.state.toURL());

    this.setSize();
    this.render();
  }

  setSize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.tiles = [...Tile.tiles(this.width, this.height, ROWS, COLS)];
  }

  setState(f, save = true) {
    if (typeof f === "function") {
      f(this.state);
    } else {
      for (let property in f) {
        this.state[property] = f[property];
      }
    }
    this.render();
    if (save) {
      history.pushState(this.state, "", this.state.toURL());
    }
  }

  // 三角形のワールド座標頂点（現在の side を使用）
  getTriangleVertices() {
    const { side } = this.state;
    const h = (side * Math.sqrt(3)) / 2;
    // 上頂点A、下辺左B、下辺右C（重心は下側に少し寄るが、初期cyで補正済み）
    return [
      { x: 0, y: +h / 2 }, // A
      { x: -side / 2, y: -h / 2 }, // B
      { x: +side / 2, y: -h / 2 }, // C
    ];
  }

  render() {
    if (this.pendingRender) {
      this.wantsRerender = true;
      return;
    }
    const { cx, cy, perPixel, density } = this.state;
    const x0 = cx - (perPixel * this.width) / 2;
    const y0 = cy - (perPixel * this.height) / 2;
    const vertices = this.getTriangleVertices();

    const promises = this.tiles.map((tile) =>
      this.workerPool.addWork({
        tile,
        x0: x0 + tile.x * perPixel,
        y0: y0 + tile.y * perPixel,
        perPixel,
        vertices,
        // タイル内ピクセル数に比例させた点数（密度で調整）
        points: Math.max(1000, Math.floor(tile.width * tile.height * density)),
      })
    );

    this.pendingRender = Promise.all(promises)
      .then((responses) => {
        this.canvas.style.transform = "";
        for (let r of responses) {
          this.context.putImageData(r.imageData, r.tile.x, r.tile.y);
        }
      })
      .catch((reason) => {
        console.error("Promise rejected in render():", reason);
      })
      .finally(() => {
        this.pendingRender = null;
        if (this.wantsRerender) {
          this.wantsRerender = false;
          this.render();
        }
      });
  }

  handleResize(event) {
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.resizeTimer = null;
      this.setSize();
      this.render();
    }, 200);
  }

  handleKey(event) {
    switch (event.key) {
      case "Escape":
        this.setState(PageState.initialState());
        break;
      case "+": // 密度アップ
        this.setState((s) => {
          s.density = Math.min(5, s.density * 1.5);
        });
        break;
      case "-": // 密度ダウン
        this.setState((s) => {
          s.density = Math.max(0.05, s.density / 1.5);
        });
        break;
      case "o": // ズームアウト
        this.setState((s) => (s.perPixel *= 2));
        break;
      case "ArrowUp":
        this.setState((s) => (s.cy -= (this.height / 10) * s.perPixel));
        break;
      case "ArrowDown":
        this.setState((s) => (s.cy += (this.height / 10) * s.perPixel));
        break;
      case "ArrowLeft":
        this.setState((s) => (s.cx -= (this.width / 10) * s.perPixel));
        break;
      case "ArrowRight":
        this.setState((s) => (s.cx += (this.width / 10) * s.perPixel));
        break;
    }
  }

  handlePointer(event) {
    const x0 = event.clientX,
      y0 = event.clientY,
      t0 = Date.now();
    const pointerMoveHandler = (event) => {
      let dx = event.clientX - x0,
        dy = event.clientY - y0,
        dt = Date.now() - t0;
      if (dx > 10 || dy > 10 || dt > 500) {
        this.canvas.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };
    const pointerUpHandler = (event) => {
      this.canvas.removeEventListener("pointermove", pointerMoveHandler);
      this.canvas.removeEventListener("pointerup", pointerUpHandler);
      const dx = event.clientX - x0,
        dy = event.clientY - y0,
        dt = Date.now() - t0;
      const { cx, cy, perPixel } = this.state;
      if (dx > 10 || dy > 10 || dt > 500) {
        this.setState({ cx: cx - dx * perPixel, cy: cy - dy * perPixel });
      } else {
        let cdx = x0 - this.width / 2;
        let cdy = y0 - this.height / 2;
        this.canvas.style.transform = `translate(${-cdx * 2}px, ${-cdy * 2}px) scale(2)`;
        this.setState((s) => {
          s.cx += cdx * s.perPixel;
          s.cy += cdy * s.perPixel;
          s.perPixel /= 2;
        });
      }
    };
    this.canvas.addEventListener("pointermove", pointerMoveHandler);
    this.canvas.addEventListener("pointerup", pointerUpHandler);
  }
}

// --- ページ起動 ---
const canvas = document.getElementById("sierpinski");
document.body.style = "margin:0";
canvas.style.width = "100%";
canvas.style.height = "100%";
new SierpinskiCanvas(canvas);
