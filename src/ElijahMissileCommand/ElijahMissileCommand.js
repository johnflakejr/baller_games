import React, {useRef, useEffect} from 'react';

import '../css/GameCanvas.css';

import * as PIXI from 'pixi.js';
import { sound } from '@pixi/sound';
import { drawIncoming, addIncomingMissile} from './Missile';
import { drawOutgoing , shootOutgoing} from './Missile';
import { drawExplosions} from './Explosion';
import { drawCrosshair, drawAmmo, drawScore } from './Hud';
import { GameState } from './GameState';
import {drawTowers} from './Tower';

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

var missile_delay = 5;
var mouse_x = 0;
var mouse_y = 0;

function drawBackground(gs) {

  var bg = new PIXI.Graphics();
  bg.beginFill(0x003000);
  bg.drawRect(0,0,app.view.width, app.view.height);
  bg.endFill();

  bg.x = 0;
  bg.y = 0;
  bg.interactive = true;

  bg.on('mousedown', function (e) {
    if (gs.ammunition > 0) {
      gs.ammunition--;
      shootOutgoing(gs.outgoing, gs.towers, e.data.global.x, e.data.global.y, app);
    }
  });

  bg.on('mousemove', function (e) {
    mouse_x = e.data.global.x;
    mouse_y = e.data.global.y;
  });
  app.stage.addChild(bg);
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

    var gs = new GameState();
    gs.setupTowers(app);

    ticker.add((delta) => {
        app.stage.removeChildren();

        gs.update();

        drawBackground(gs);
        drawTowers(gs.towers, app);
        drawIncoming(gs.incoming, app);
        drawOutgoing(gs.outgoing, app);
        drawExplosions(gs.explosions, app);

        drawCrosshair(mouse_x, mouse_y, app);
        drawScore(gs.score, app);
        drawAmmo(gs.ammunition, app);
        
        //Add new projectile every three seconds
        counter += (1 / 60) * delta;

        if (counter > missile_delay) {
          addIncomingMissile(gs.incoming, gs.towers, app);
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