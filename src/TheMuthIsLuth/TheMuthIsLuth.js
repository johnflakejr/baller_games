import {useRef, useEffect} from 'react';
import '../css/GameCanvas.css';
import * as PIXI from 'pixi.js';

var gameHeight = 600;

const app = new PIXI.Application({
  width: window.innerWidth,
  height: gameHeight,
  backgroundColor: 0x000000,
  resizeTo: window,
});

window.onresize = function() {
  app.renderer.resize(window.innerWidth, gameHeight);
}

export function Muth() {

  const ref = useRef(null);

  useEffect(() => {
    // On first render add app to DOM
    ref.current.appendChild(app.view);
    app.start();

    var counter = 0;
    let ticker = PIXI.Ticker.shared;


    ticker.add((delta) => {
        app.stage.removeChildren();
        counter += (1 / 60) * delta;
    });

    ticker.autoStart = false;
    ticker.start();

    return () => {
      app.stop();
    };
  }, []);

  return <div className="gameCanvas" ref={ref}/>;
}