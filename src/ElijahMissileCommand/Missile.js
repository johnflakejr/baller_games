import * as PIXI from 'pixi.js';
import {sound} from '@pixi/sound';
import {explode} from './Explosion';

export class IncomingMissile {

  constructor(startX, startY, targetX, targetY, target) {
    this.startX = startX;
    this.startY = startY;
    this.targetX = targetX;
    this.targetY = targetY;
    this.currentX = startX;
    this.currentY = startY;
    this.target = target;
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
      this.target.health -= 30;
      return true;
    }

    return false;
  }
}

function updateIncoming(incoming, explosions, score) {
  incoming.forEach((value, index) => {
    value.update();
  });

  incoming = incoming.filter(function(value) {

    //Check if any outgoing missiles stopped this incoming missile
    for (var i = 0; i < explosions.length; i++) {
      var x_dist = value.currentX - explosions[i].x;
      var y_dist = value.currentY - explosions[i].y;
      console.log("X_dist: " + x_dist);
      console.log("Y_dist: " + y_dist);
      var dist = Math.sqrt(x_dist * x_dist + y_dist * y_dist);

      console.log("Distance between projectile and missile: " + dist);
      if (dist < explosions[i].radius) {
        sound.play('missile_explosion');
        score++;
        return false;
      }
    }

    //Reduce health of target
    if (value.didHitTarget()) {
      return false;
    }

    return true;
  })

  return [incoming, score];
}

function drawIncoming(incoming, app) {
  var graph = new PIXI.Graphics();

  incoming.forEach((value, index) => {
    graph.beginFill(0xFFFFFF);
    graph.lineStyle(1, 0xFFFFFF, 1);
    graph.moveTo(value.startX, value.startY);
    graph.lineTo(value.currentX, value.currentY);
    graph.endFill();
  });

  app.stage.addChild(graph);
}

function addIncomingMissile(incoming, missile_towers, app) {
  if (missile_towers.length === 0) {
    return;
  }

  let target_i = Math.floor(Math.random() * missile_towers.length);
  let target = missile_towers[target_i];
  let targetX = target.sprite.x + (target.sprite.width / 2);
  let targetY = target.sprite.y + (target.sprite.height / 2);
  let newMissile = new IncomingMissile(Math.random() * app.view.width, 0, targetX, targetY, target);
  incoming.push(newMissile);
}

export class OutgoingMissile {

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

function updateOutgoing(outgoing_projectiles, explosions) {
  outgoing_projectiles.forEach((value, index) => {
    value.update();
  });

  outgoing_projectiles = outgoing_projectiles.filter(function(value) {
    if (value.didFinish()) {
        explode(value.currentX, value.currentY, explosions);
        return false;
      } else {
        return true;
    }
  })

  return outgoing_projectiles;
}

function drawOutgoing(outgoing_projectiles, app) {
  var graph = new PIXI.Graphics();

  outgoing_projectiles.forEach((value, index) => {
    graph.beginFill(0xFFFFFF);
    graph.lineStyle(1, 0xFFFFFF, 1);
    graph.moveTo(value.startX, value.startY);
    graph.lineTo(value.currentX, value.currentY);
    graph.endFill();
  });

  app.stage.addChild(graph);
}

function shootOutgoing(outgoing_projectiles, missile_towers, x, y, app) {
  if (y > missile_towers[0].sprite.y) {
    return;
  }

  //console.log("Shooting missile to: " + x + "," + y);
  var startX = missile_towers[0].sprite.x + missile_towers[0].sprite.width / 2;
  var startY = missile_towers[0].sprite.y + missile_towers[0].sprite.height / 3;
  if (x > app.view.width / 3 && x < 2 * (app.view.width / 3)) {
    startX = missile_towers[1].sprite.x + missile_towers[1].sprite.width / 2;
  } else if ( x > 2 * (app.view.width / 3)) {
    startX = missile_towers[2].sprite.x + missile_towers[2].sprite.width / 2;
  }

  var new_proj = new OutgoingMissile(x, y, startX, startY);
  outgoing_projectiles.push(new_proj);
}

export {updateOutgoing, drawOutgoing, shootOutgoing}
export {updateIncoming, drawIncoming, addIncomingMissile}