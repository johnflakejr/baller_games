/*

Projectiles that YOU shoot towards the incoming missiles.

*/


export class Projectile {

  constructor(destX, destY, startX, startY) {
    this.destX = destX;
    this.destY = destY;
    this.startX = startX;
    this.startY = startY;
    this.currentX = startX;
    this.currentY = startY;
  }

  update() {
    let rise = this.destY - this.startY;
    let run = this.destX - this.startX;

    this.currentX = this.currentX + (run / 40);
    this.currentY = this.currentY + (rise / 40);
  }

  didFinish() {
    //console.log("Target Y = " + this.targetY);
    //console.log("Current Y = " + this.currentY);
    if (this.currentY <= this.destY){
      return true;
    }

    return false;
  }

}