var music = new Audio('./assets/bling.mp3')
music.play();
const app = new PIXI.Application({ backgroundColor: 0xFFFFFF });
document.body.appendChild(app.view);

// create a new Sprite from an image path
const andy = PIXI.Sprite.from('./assets/andy.png');
const missile = PIXI.Sprite.from('./assets/elijah_missile.png');

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