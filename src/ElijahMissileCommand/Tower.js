import * as PIXI from 'pixi.js';

const em_path = './elijah_missile.png';

class Tower {
  constructor (x, y, width, height) {
    this.health = 100;
    this.sprite = PIXI.Sprite.from(em_path);
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.width = width;
    this.sprite.height = height;
  }
}

function drawTowers(towers, app) {
  towers.forEach((value, index) => {
    app.stage.addChild(value.sprite);
  });
}

export {Tower, drawTowers}