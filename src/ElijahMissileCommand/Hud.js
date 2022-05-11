import * as PIXI from 'pixi.js';

const crosshairPath = './crosshair.png';

function drawCrosshair(x, y, app) {
  var crosshair = PIXI.Sprite.from(crosshairPath);
  crosshair.width = 30;
  crosshair.height = 30;
  crosshair.x = x - 15;
  crosshair.y = y - 15;
  app.stage.addChild(crosshair);
}

function drawAmmo(ammunition, app) {
  let text = new PIXI.Text("Ammo: " + ammunition, {font:"50px Courier", fill:"white"});
  text.x = 10;
  text.y = 40;
  app.stage.addChild(text);
}

function drawScore(score, app) {
  let text = new PIXI.Text("Score: " + score, {font:"50px Courier", fill:"white"});
  text.x = 10;
  text.y = 10;
  app.stage.addChild(text);
}

export {drawAmmo, drawScore, drawCrosshair}