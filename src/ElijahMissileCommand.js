import * as PIXI from 'pixi.js';
import { sound } from '@pixi/sound';
import './css/GameCanvas.css';
import React, {useRef, useEffect} from 'react';
import { IncomingMissile } from './IncomingMissile';
import { Projectile } from './Projectile';
import { Explosion } from './Explosion';

const gameHeight = 600;


const app = new PIXI.Application({
  width: window.innerWidth,
  height: gameHeight,
  backgroundColor: 0x000000,
  resizeTo: window,
});

window.onresize = function() {
  app.renderer.resize(window.innerWidth, gameHeight);
}

const missile_path = "./elijah_missile.png";
var incoming = [];
var missile_towers = [];
var outgoing_projectiles = [];
var score = 0;
var missile_delay = 5;
var ammunition = 100;
var explosions = [];
var mouse_x = 0;
var mouse_y = 0;

function updateOutgoing() {
  outgoing_projectiles.forEach((value, index) => {
    value.update();
  });

  outgoing_projectiles = outgoing_projectiles.filter(function(value) {
    if (value.didFinish()) {
        explode(value.currentX, value.currentY);
        return false;
      } else {
        return true;
    }
  })
}
function updateExplosions() {
  explosions.forEach((value, index) => {
    value.update();
  });

  explosions = explosions.filter(function(value) {
    return ! (value.done);
    
  })
}


function updateIncoming() {
  incoming.forEach((value, index) => {
    value.update();
  });

  incoming = incoming.filter(function(value) {
    //Check if it hit target or if it hit an explosion.

    for (var i = 0; i < explosions.length; i++) {
      var x_dist = value.currentX - explosions[i].x;
      var y_dist = value.currentY - explosions[i].y;
      console.log("X_dist: " + x_dist);
      console.log("Y_dist: " + y_dist);
      var dist = Math.sqrt(x_dist * x_dist + y_dist * y_dist);

      console.log("Distance between projectile and missile: " + dist);
      if (dist < explosions[i].radius) {
        sound.play('missile_explosion');
        return false;
      }
    }

    return !(value.didHitTarget());
  })
}

function drawCrosshair(x, y) {
  var crosshair = PIXI.Sprite.from('./crosshair.png');
  crosshair.width = 30;
  crosshair.height = 30;
  crosshair.x = x - 15;
  crosshair.y = y - 15;
  app.stage.addChild(crosshair);
}

function drawExplosions() {
  var graph = new PIXI.Graphics();

  explosions.forEach((value, index) => {
    graph.beginFill(0xFF8888);
    graph.drawCircle(value.x, value.y, value.radius);
    graph.endFill();
  });

  app.stage.addChild(graph);
}

function drawIncoming() {
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

function drawOutgoing() {
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

function addIncomingMissile() {
  let target = Math.floor(Math.random() * 3);
  let targetX = missile_towers[target].x + (missile_towers[target].width / 2);
  let targetY = missile_towers[target].y + (missile_towers[target].height / 2);
  let newMissile = new IncomingMissile(Math.random() * app.view.width, 0, targetX, targetY);
  incoming.push(newMissile);
}

function drawAmmo() {
  let text = new PIXI.Text("Ammo: " + ammunition, {font:"50px Courier", fill:"white"});
  text.x = 10;
  text.y = 40;
  app.stage.addChild(text);
}

function drawScore() {
  let text = new PIXI.Text("Score: " + score, {font:"50px Courier", fill:"white"});
  text.x = 10;
  text.y = 10;
  app.stage.addChild(text);
}

function drawTowers() {
  missile_towers = [];
  for (var i = 0; i < 3; i++) {
    var missile_tower = PIXI.Sprite.from(missile_path);
    missile_tower.width = app.view.width / 6;
    missile_tower.height = app.view.width / 6;
    missile_tower.x = (i * app.view.width / 3) + missile_tower.width / 2;
    missile_tower.y = app.view.height - missile_tower.height;
    missile_towers.push(missile_tower);
  }

  app.stage.addChild(...missile_towers);
}

function explode(x,y) {
  sound.play('projectile_explosion');
  console.log("Explosion at: " + x + "," + y);
  var explosion = new Explosion(x,y);
  explosions.push(explosion);
}

function shootProjectile(x, y) {
  if (ammunition <= 0) {
    return;
  }
  ammunition--;
  console.log("Shooting missile to: " + x + "," + y);
  var startX = missile_towers[0].x + missile_towers[0].width / 2;
  var startY = missile_towers[0].y + missile_towers[0].height / 3;
  if (x > app.view.width / 3 && x < 2 * (app.view.width / 3)) {
    startX = missile_towers[1].x + missile_towers[1].width / 2;
  } else if ( x > 2 * (app.view.width / 3)) {
    startX = missile_towers[2].x + missile_towers[2].width / 2;
  }

  var new_proj = new Projectile(x, y, startX, startY);
  outgoing_projectiles.push(new_proj);
}

export function ElijahMissileCommand() {

  const ref = useRef(null);

  useEffect(() => {
    // On first render add app to DOM
    ref.current.appendChild(app.view);
    app.start();
    sound.add('projectile_explosion', './explosion1.mp3');
    sound.add('missile_explosion', './explosion2.mp3');

    var counter = 0;
    let ticker = PIXI.Ticker.shared;

    ticker.add((delta) => {
        app.stage.removeChildren();

        updateExplosions();
        updateIncoming();
        updateOutgoing();

        var bg = new PIXI.Graphics();
        bg.beginFill(0x004000);
        bg.drawRect(0,0,app.view.width, app.view.height);
        bg.endFill();
        bg.x = 0;
        bg.y = 0;
        bg.interactive = true;
        bg.on('mousedown', function (e) {
          console.log('Mouse clicked');
          console.log('X', e.data.global.x, 'Y', e.data.global.y);
          shootProjectile(e.data.global.x, e.data.global.y);
        });
        bg.on('mousemove', function (e) {
          console.log('Mouse moved');
          console.log('X', e.data.global.x, 'Y', e.data.global.y);
          mouse_x = e.data.global.x;
          mouse_y = e.data.global.y;
        });
        app.stage.addChild(bg);

        drawTowers();
        drawIncoming();
        drawOutgoing();
        drawExplosions();
        drawCrosshair(mouse_x, mouse_y);

        drawScore();
        drawAmmo();

        
        
        //Add new projectile every three seconds
        counter += (1 / 60) * delta;

        if (counter > missile_delay) {
          addIncomingMissile();
          counter = 0;
        }
    });

    ticker.autoStart = false;
    ticker.start();

    return () => {
      app.stop();
    };
  }, []);

  return <div className="gameCanvas" ref={ref}/>;
}