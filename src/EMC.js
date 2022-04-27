import * as PIXI from 'pixi.js';
import React, {useRef, useEffect} from 'react';

const app = new PIXI.Application({
  width: 800,
  height: 600,
  backgroundColor: 0xCCCCCC,
});

export function ElijahMissileCommand() {
  const ref = useRef(null);

  useEffect(() => {
    // On first render add app to DOM
    ref.current.appendChild(app.view);
    // create a new Sprite from an image path
    app.start();
    const andy = PIXI.Sprite.from('./andy.png');
    const missile = PIXI.Sprite.from('./elijah_missile.png');

    // center the sprite's anchor point
    andy.anchor.set(0.5);

    // move the sprite to the center of the screen
    andy.x = app.screen.width / 2;
    andy.y = app.screen.height / 2;

    missile.x = 60;
    missile.y = 50;

    app.stage.addChild(andy);
    app.stage.addChild(missile);

    // Listen for animate update
    app.ticker.add((delta) => {
        // just for fun, let's rotate mr rabbit a little
        // delta is 1 if running at 100% performance
        // creates frame-independent transformation
        //andy.rotation += 0.1 * delta;
        andy.x += delta / 2;
        missile.y+= delta / 2;
        if (andy.x > 500) {
          andy.x = 0;
        }
    });

    return () => {
      // On unload stop the application
      app.stop();
    };
  }, []);




  return <div ref={ref}/>;
}

