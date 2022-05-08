import * as PIXI from 'pixi.js';
import './css/GameCanvas.css';
import React, {useRef, useEffect} from 'react';
import { IncomingMissile } from './IncomingMissile';

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
var score = 0;
var missile_delay = 5;

function updateIncoming() {
  incoming.forEach((value, index) => {
    value.update();
  });

  incoming = incoming.filter(function(value) {
    return !(value.didHitTarget());
  })
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

function addIncomingMissile() {
  let target = Math.floor(Math.random() * 3);
  let targetX = missile_towers[target].x + (missile_towers[target].width / 2);
  let targetY = missile_towers[target].y + (missile_towers[target].height / 2);
  let newMissile = new IncomingMissile(Math.random() * app.view.width, 0, targetX, targetY);
  incoming.push(newMissile);
}

function drawScore() {
  let text = new PIXI.Text(score + "", {font:"50px Courier", fill:"white"});
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

export function ElijahMissileCommand() {

  const ref = useRef(null);

  useEffect(() => {
    console.log("HELLO THERE FUCKER!");
    // On first render add app to DOM
    ref.current.appendChild(app.view);
    app.start();

    var counter = 0;
    let ticker = PIXI.Ticker.shared;

    ticker.add((delta) => {
        app.stage.removeChildren();

        updateIncoming();

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
        });
        app.stage.addChild(bg);

        drawTowers();
        drawIncoming();
        drawScore();

        
        
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