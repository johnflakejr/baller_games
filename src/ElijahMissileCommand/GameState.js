/*

Class to manage all game state, including: 

- Score
- Ammunition
- Location of objects
- Health of objects

*/

import { updateExplosions } from "./Explosion";
import { updateOutgoing, updateIncoming } from "./Missile";
import {Tower, updateTowers} from './Tower';

export class GameState {
  constructor() {
    this.ammunition = 100;
    this.score = 0;
    this.incoming = [];
    this.outgoing = [];
    this.explosions = [];
    this.towers = [];
    this.houses = [];
    this.missile_delay = 5;
    this.active = true;
  }
  
  setupTowers(app) {
    for (var i = 0; i < 3; i++) {
      var width = app.view.width / 6;
      var height = app.view.width / 6;
      var x = (i * app.view.width / 3) + width / 2;
      var y = app.view.height - height;
      var tower = new Tower(x, y, width, height);
      this.towers.push(tower);
    }
  }

  update() {
    this.explosions = updateExplosions(this.explosions);
    [this.incoming, this.score] = updateIncoming(this.incoming, this.explosions, this.score);
    this.towers = updateTowers(this.towers);
    this.outgoing = updateOutgoing(this.outgoing, this.explosions);
  }
}