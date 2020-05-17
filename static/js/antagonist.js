import { pixelRatio, enemies, blockWidth, blockHeight } from './defaults.js';

// Enemy
class antagonist {
  constructor(x, y, type) {
    this._height = blockHeight;
    this._width = blockWidth;

    this._collisionYX = [(blockHeight / 2), (blockWidth / 2)];
    this._x = x + this._collisionYX[1];
    this._y = y + this._collisionYX[0];

    this._horizontalSpeed = 1 * pixelRatio;
    this._verticalSpeed = 1 * pixelRatio;
    this._direction = [([1,-1, 0][Math.round(Math.random()*2)]), ([1,-1, 0][Math.round(Math.random()*2)])];
    this._lastDirection = [0,0];

    this._facing = 1;

    let colors = ['rgb(0,255,128)', 'rgb(255,0,128)', 'rgb(0,128,255)'];
    this._sprite = (this._canJump) ? colors[0] : colors[1];
    if(this._direction === 0) {
      this._sprite = colors[2];
    }

    this._onGround = null;
  }

  kill() {
    this._dead = true;
  }
}


export default antagonist;
