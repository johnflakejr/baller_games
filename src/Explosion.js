export class Explosion {

  constructor(x,y){
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.expanding = true;
    this.done = false;
  }

  update() {
    if (this.done) {
      return;
    }

    if (this.expanding) {
      this.radius += 1;
      if (this.radius > 50) {
        this.expanding = false;
      }
    } else {
      this.radius -= 1;
      if (this.radius === 0) {
        this.done = true;
      }
    }
  }
}