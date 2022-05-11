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


  if (gs.active) {
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
  }

  app.stage.addChild(bg);

  if (!gs.active) {
    let game_over_text = new PIXI.Text("GAME OVER", {font:"50px Courier", fill:"white"});
    game_over_text.x = app.view.width / 2 - 40;
    game_over_text.y = app.view.height / 2;
    app.stage.addChild(game_over_text);
  }
}

export function ElijahMissileCommand() {

  const ref = useRef(null);

  useEffect(() => {
    // On first render add app to DOM
    ref.current.appendChild(app.view);
    app.start();
    sound.add('projectile_explosion', './explosion1.mp3');
    sound.add('missile_explosion', './explosion2.mp3');

    var missile_counter = 0;
    var delay_counter;
    let ticker = PIXI.Ticker.shared;

    var gs = new GameState();
    gs.setupTowers(app);

    ticker.add((delta) => {
        app.stage.removeChildren();

        gs.update();

        if (gs.towers.length === 0) {
          gs.active = false;
        } 

        drawBackground(gs);
        drawTowers(gs.towers, app);
        drawIncoming(gs.incoming, app);
        drawOutgoing(gs.outgoing, app);
        drawExplosions(gs.explosions, app);

        drawCrosshair(mouse_x, mouse_y, app);
        drawScore(gs.score, app);
        drawAmmo(gs.ammunition, app);
        
        //Add new projectile every three seconds
        missile_counter += (1 / 60) * delta;
        delay_counter += (1 / 60) * delta;

        if (missile_counter > gs.missile_delay) {
          addIncomingMissile(gs.incoming, gs.towers, app);
          missile_counter = 0;
        }

        //Every three seconds, make the missiles come faster. 
        if (delay_counter > 3) {
          gs.missile_delay -= 0.1;
          delay_counter = 0;
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