export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distance() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  add(x, y) {
    this.x += x;
    this.y += y;
  }
}
