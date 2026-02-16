// Life Game のルールに従ってセルを更新する
// exportに伴い、引数を追加

export function updateGrid(grid, rows, cols) {
    // 新しいグリッドを作成（浅いコピー）
    const nextGrid = grid.map((arr) => [...arr]);
  
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let aliveCount = 0;
  
        // 周囲 8 マスの生存数を数える
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
  
            const r = row + dr;
            const c = col + dc;
  
            if (r >= 0 && r < rows && c >= 0 && c < cols) {
              if (grid[r][c]) aliveCount++;
            }
          }
        }
  
        const cell = grid[row][col];
  
        // ライフゲームのルール
        if (cell) {
          nextGrid[row][col] = aliveCount === 2 || aliveCount === 3;
        } else {
          nextGrid[row][col] = aliveCount === 3;
        }
      }
    }
  
    return nextGrid;
  }
  