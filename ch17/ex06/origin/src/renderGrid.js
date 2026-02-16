// grid を canvas に描画する
// exportに伴い、引数を追加
export function renderGrid(grid, ctx, rows, cols, resolution) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cell = grid[row][col];
        ctx.beginPath();
        ctx.rect(col * resolution, row * resolution, resolution, resolution);
        ctx.fillStyle = cell ? "black" : "white";
        ctx.fill();
        ctx.stroke();
      }
    }
  }
  