import { sound } from "@pixi/sound";
import * as PIXI from 'pixi.js';
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

function explode(x,y, explosions) {
  sound.play('projectile_explosion');
  console.log("Explosion at: " + x + "," + y);
  var explosion = new Explosion(x,y);
  explosions.push(explosion);
}

function drawExplosions(explosions, app) {
  var graph = new PIXI.Graphics();

  explosions.forEach((value, index) => {
    graph.beginFill(0xFF8888);
    graph.drawCircle(value.x, value.y, value.radius);
    graph.endFill();
  });

  app.stage.addChild(graph);
}

function updateExplosions(explosions) {
  explosions.forEach((value, index) => {
    value.update();
  });

  explosions = explosions.filter(function(value) {
    return ! (value.done);
  })

  return explosions;
}

export {explode, drawExplosions, updateExplosions}