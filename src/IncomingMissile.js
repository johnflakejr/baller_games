export class IncomingMissile {

  constructor(startX, startY, targetX, targetY) {
    this.startX = startX;
    this.startY = startY;
    this.targetX = targetX;
    this.targetY = targetY;
    this.currentX = startX;
    this.currentY = startY;
  }

  update() {
    let rise = this.targetY - this.startY;
    let run = this.targetX - this.startX;

    this.currentX = this.currentX + (run / 300);
    this.currentY = this.currentY + (rise / 300);
  }

  didHitTarget() {
    //console.log("Target Y = " + this.targetY);
    //console.log("Current Y = " + this.currentY);
    if (this.currentY >= this.targetY){
      return true;
    }

    return false;
  }
}