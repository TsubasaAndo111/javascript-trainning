export const obj = {
    r: 0,
    theta: 0, // θ はラジアン
  
    get x() {
      return this.r * Math.cos(this.theta);
    },
  
    set x(value) {
      if (Number.isNaN(value)) {
        throw new Error('Invalid value for x: NaN is not allowed.');
      }
      const y = this.y; 
      this.r = Math.hypot(value, y);  // ユークリッド距離を返す、つまり極座標のr
      this.theta = Math.atan2(y, value); // atanだと分母が0のときにInfinityやNaNになるが、atan2だと安全に角度を返してくれる
    },
  
    get y() {
      return this.r * Math.sin(this.theta);
    },
  
    set y(value) {
      if (Number.isNaN(value)) {
        throw new Error('Invalid value for y: NaN is not allowed.');
      }
      const x = this.x; 
      this.r = Math.hypot(x, value);
      this.theta = Math.atan2(value, x);
    }
  };