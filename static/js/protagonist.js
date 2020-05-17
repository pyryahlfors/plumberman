// Player
import { pixelRatio, enemies, blockWidth, blockHeight } from './defaults.js';

class protagonist {
  constructor(x, y) {
    // Set up basic variables for character
    this._height = blockHeight;
    this._width = blockWidth;

    this._collisionYX = [(this._height / 2), (this._width / 2)];
    this._x = x + this._collisionYX[1];
    this._y = y + this._collisionYX[0];

    this._horizontalSpeed = 1 * pixelRatio;
    this._horizontalSpeedOriginal = 1 * pixelRatio;
    this._verticalSpeed = 1 * pixelRatio;
    this._verticalSpeedOriginal = 1 * pixelRatio;
    this._direction = [0,0];
    this._lastDirection = [0,0];
    this._facing = null;
    this._jump = null;
    this._onGround = null;
    this._died = false;

    this._sprite = "rgba(255,128,64,1)";

    this.kill = (x,y) => {
      this._died = true;
      document.querySelector('.died').style.display = 'block';
    }
  }
}

export default protagonist;
