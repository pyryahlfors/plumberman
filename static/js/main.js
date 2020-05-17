import { pixelRatio, enemies, blockWidth, blockHeight, debug } from './defaults.js';
import level from './level_map.js';
import levelBgr from './level_background.js';
import protagonist from './protagonist.js';
import antagonist from './antagonist.js';
import particles from './particles.js';

let platformer = {
  pixelRatio,
  enemies,
  blockWidth,
  blockHeight,
  level,
  levelBgr,

  blockTypes: {
    'B': {
      color: 'rgb(64,64,32)',
      name: 'Block'
    },
    'b': {
      color: 'rgb(64,64,32)',
      name: 'Underwater block'
    },
    'u': {
      color: 'rgb(64,64,32)',
      name: 'Underwater block surface'
    },

    'G': {
      color: 'rgb(128, 64, 16)',
      name: 'Ground block'
    },
    'g': {
      color: 'rgba(64,64,32,.4)',
      name : 'Grass'
    },
    'W': {
      color: 'rgba(0, 216, 255, .6)',
      name: 'Water waves'
    },
    'w': {
      color: 'rgba(0, 216, 255, .6)',
      name: 'Water static'
    }

  },

  init: function() {
    platformer.objectContainer = document.querySelector('.scroll-container');
    platformer.parallaxContainer = document.querySelector('.parallax-container');
    this.drawLevel(this.level);
  },

  drawLevel: function(level) {
    platformer.levelWidth = level[0].length;
    platformer.levelHeight = level.length;
    platformer.levelContainer = document.createElement("CANVAS");
    platformer.levelContainerCTX = this.levelContainer.getContext('2d');
    platformer.levelContainer.style.width = platformer.levelWidth * platformer.blockWidth + "px";
    platformer.levelContainer.style.height = platformer.levelHeight * platformer.blockHeight + "px";

    platformer.levelContainer.width = platformer.levelWidth * platformer.blockWidth * this.pixelRatio;
    platformer.levelContainer.height = platformer.levelHeight * platformer.blockHeight * this.pixelRatio;

    platformer.parallaxContainer.style.width = platformer.levelWidth * platformer.blockWidth+"px";
    platformer.parallaxContainer.style.height = platformer.levelHeight * platformer.blockHeight+"px";

    platformer.spriteContainer = document.createElement("CANVAS");
    platformer.spriteContainerCTX = this.spriteContainer.getContext('2d');
    platformer.spriteContainer.style.width = platformer.levelWidth * platformer.blockWidth + "px";
    platformer.spriteContainer.style.height = platformer.levelHeight * platformer.blockHeight + "px";
    platformer.spriteContainer.width = platformer.levelWidth * platformer.blockWidth * this.pixelRatio;
    platformer.spriteContainer.height = platformer.levelHeight * platformer.blockHeight * this.pixelRatio;

    platformer.animatedBackgroundContainer = document.createElement("DIV");
    platformer.animatedBackgroundContainer.className = "bgr-animations-container";
    platformer.animatedBackgroundContainer.style.width = `${platformer.levelWidth * platformer.blockWidth}px`;
    platformer.animatedBackgroundContainer.style.height = `${platformer.levelHeight * platformer.blockHeight}px`;

    // Normalize coordinate system(s)
    platformer.levelContainerCTX.scale(this.pixelRatio, this.pixelRatio);
    platformer.spriteContainerCTX.scale(this.pixelRatio, this.pixelRatio);


    platformer.level.map((y) => {
      console.log(y)
    });

    for (let y = 0; y < platformer.levelHeight; y++) {
      let newRow = "";
      for (let x = 0; x < platformer.levelWidth; x++) {
        // Enemies
        if (level[y][x] == 'E') {
          newRow += " ";
          let newEnemy = new antagonist(x * platformer.blockWidth, y * platformer.blockHeight)
          platformer.enemies.push(newEnemy);
        }

        // Player
        else if (level[y][x] == 'P') {
          newRow += " ";
          platformer.player = new protagonist(x * platformer.blockWidth, y * platformer.blockWidth);
        }

        else if (level[y][x] !== ' ') {
          newRow += level[y][x];
          if (platformer.blockTypes[level[y][x]]) {
            // Water
            if (level[y][x] === 'W' || level[y][x] === 'w') {
              let img = new Image();
              img.style.top = `${y * platformer.blockHeight}px`;
              img.style.left = `${x * platformer.blockWidth}px`;
              img.width = `${platformer.blockHeight}`;
              img.height = `${platformer.blockWidth}`;

              img.src = `./images/${(level[y][x] === 'W') ? "water.svg" : "water.gif"}`;
              platformer.animatedBackgroundContainer.appendChild(img);
            }
          else if (level[y][x] === 'G') {
              var grassObj = new Image();
              grassObj.onload = function(x, y) {
                this.levelContainerCTX.drawImage(grassObj, (x * platformer.blockWidth), (y * platformer.blockHeight), platformer.blockWidth, platformer.blockHeight);
              }.bind(this, x, y);
              grassObj.src = `./images/grass.gif`;
            }
            // Bush
          else if (level[y][x] === 'g') {
              let bushImg = new Image();
              bushImg.style.top = `${y * platformer.blockHeight}px`;
              bushImg.style.left = `${x * platformer.blockWidth}px`;
              bushImg.width = `${platformer.blockHeight}`;
              bushImg.height = `${platformer.blockWidth}`;

              bushImg.src = `./images/bush.gif`;
              platformer.animatedBackgroundContainer.appendChild(bushImg);
              // Make a foreground element
              newRow = newRow.replace(/.$/," ");
            }
          else if (level[y][x] === 'B') {
              var rockObj = new Image();
              rockObj.onload = function(x, y) {
                this.levelContainerCTX.drawImage(rockObj, (x * platformer.blockWidth), (y * platformer.blockHeight), platformer.blockWidth, platformer.blockHeight);
              }.bind(this, x, y);
              rockObj.src = `./images/rock.gif`;
            }
          else if (level[y][x] === 'b' || level[y][x] === 'u') {
              var rockObj = new Image();
              rockObj.onload = function(x, y) {
                this.levelContainerCTX.drawImage(rockObj, (x * platformer.blockWidth), (y * platformer.blockHeight), platformer.blockWidth, platformer.blockHeight);
              }.bind(this, x, y);
              rockObj.src = `./images/rock.gif`;
              let img = new Image();
              img.style.top = `${y * platformer.blockHeight}px`;
              img.style.left = `${x * platformer.blockWidth}px`;
              img.width = `${platformer.blockHeight}`;
              img.height = `${platformer.blockWidth}`;

              img.src = `./images/${(level[y][x] === 'u') ? "water.svg" : "water_static.svg"}`;
              platformer.animatedBackgroundContainer.appendChild(img);
            }
          else {
              this.levelContainerCTX.beginPath();
              this.levelContainerCTX.moveTo(x * platformer.blockWidth, y * platformer.blockHeight);
              this.levelContainerCTX.fillStyle = platformer.blockTypes[level[y][x]].color;
              this.levelContainerCTX.fillRect(x * platformer.blockWidth, y * platformer.blockHeight, platformer.blockWidth, platformer.blockHeight);
            }
          }
        } else {
          newRow += " ";
        }
      }
      platformer.level[y] = newRow;
    }

    this.objectContainer.appendChild(platformer.levelContainer);
    this.objectContainer.appendChild(platformer.spriteContainer);
    this.objectContainer.appendChild(platformer.animatedBackgroundContainer);
    frame();
  },

  placeBomb: function(x,y,type) {
    let blockX =  Math.ceil(x / platformer.blockWidth)-1;
    let blockY = Math.ceil(y / platformer.blockHeight)-1;

    // Insert new block
    platformer.level[blockY] = platformer.level[blockY].substring(0, blockX) + 'B' + platformer.level[blockY].substring(blockX + 1);//.substring(0, x) + 'Q' + nakki.substring(0 + 1);

    // Push new image onto screen. Also make this somewhere else
    var grassObj = new Image();
    grassObj.onload = function(x, y) {
      this.levelContainerCTX.drawImage(grassObj, (blockX * platformer.blockWidth), (blockY * platformer.blockHeight), platformer.blockWidth, platformer.blockHeight);
    }.bind(this, x, y);
    grassObj.src = `./images/bomb.gif`;

    // exblösiuun
    setTimeout(()=>{
      // remove bomb block
      platformer.level[blockY] = platformer.level[blockY].substring(0, blockX) + ' ' + platformer.level[blockY].substring(blockX + 1);
      platformer.levelContainerCTX.clearRect(blockX*platformer.blockWidth, blockY*platformer.blockWidth, platformer.blockWidth, platformer.blockHeight);
      new particles(blockX*platformer.blockWidth, blockY*platformer.blockHeight);

      // Collision detect with player
    if (blockX === Math.floor(platformer.player._x/platformer.blockWidth) &&
        blockY === Math.floor(platformer.player._y/platformer.blockHeight)) {
        platformer.player.kill(blockX*platformer.blockWidth, blockY*platformer.blockHeight);
      }

    }, 1999);

    /*
    platformer.level.map((y) => {
      console.log(y)
    });
*/
  },

  // Move enemies
  moveBlock: function(elem) {
   let surroundings = platformer.getSurroundings(elem);

   if ((surroundings.L !== ' ' && elem._direction[0] < 0) || (surroundings.R !== ' ' && elem._direction[0] > 0)) {
      // If wall is hit, place protagonist right next to the wall
      elem._x = Math.ceil(elem._x / platformer.blockWidth) * platformer.blockWidth - elem._collisionYX[1];
      elem._direction[0] *= -1;
    }
    else {
      elem._x += elem._horizontalSpeed * elem._direction[0];
    }

    if ((surroundings.T !== ' ' && elem._direction[1] < 0) || (surroundings.B !== ' ' && elem._direction[1] > 0)) {
      elem._y = Math.ceil(elem._y / elem._height) * elem._height - elem._collisionYX[0];
      elem._direction[1] *= -1;
    } else {
      // Otherwise move player by horizontal speed
      elem._y += elem._verticalSpeed * elem._direction[1];
    }



    let centerX = elem._x - elem._collisionYX[1];
    let centerY = elem._y - elem._collisionYX[0];
    platformer.spriteContainerCTX.beginPath();
    platformer.spriteContainerCTX.moveTo(centerX, centerY);
    platformer.spriteContainerCTX.fillStyle = elem._sprite;
    platformer.spriteContainerCTX.fillRect(centerX, centerY, platformer.blockWidth, platformer.blockHeight);

    if (elem._direction[0] < 0) {
      elem._xx = Math.ceil(centerX / platformer.blockWidth);
      elem._yy = Math.ceil(centerY / platformer.blockHeight);
    } else {
      elem._xx = Math.floor(centerX / platformer.blockWidth);
      elem._yy = Math.floor(centerY / platformer.blockHeight);
    }
// Collision detect with player
    if (elem._x < platformer.player._x + platformer.player._width &&
       elem._x + elem._width > platformer.player._x &&
       elem._y < platformer.player._y + platformer.player._height &&
       elem._height + elem._y > platformer.player._y) {
         platformer.player.kill(elem._xx, elem._yy);
       }
    },


  movePlayer: function(elem) {
    // Get surrounding bloks
    let surroundings = platformer.getSurroundings(elem);

    if ((surroundings.L !== ' ' && elem._direction[0] < 0) || (surroundings.R !== ' ' && elem._direction[0] > 0)) {
      // If wall is hit, place protagonist right next to the wall
      elem._x = Math.ceil(elem._x / elem._width) * elem._width - elem._collisionYX[1];
    } else {
      // Otherwise move player by horizontal speed
      elem._x += elem._horizontalSpeed * elem._direction[0];
    }


    if ((surroundings.T !== ' ' && elem._direction[1] < 0) || (surroundings.B !== ' ' && elem._direction[1] > 0)) {
      // If wall is hit, place protagonist right next to the wall
      elem._y = Math.ceil(elem._y / elem._height) * elem._height - elem._collisionYX[0];
    } else {
      // Otherwise move player by horizontal speed
      elem._y += elem._horizontalSpeed * elem._direction[1];
    }

    let centerX = elem._x - elem._collisionYX[1];
    let centerY = elem._y - elem._collisionYX[0];

    var imageObj = new Image();
    imageObj.src = `./images/fox_${elem._direction[0]}.gif`;
    this.spriteContainerCTX.drawImage(imageObj, centerX, centerY, elem._width, elem._height);
    elem._xx = Math.round(centerX / platformer.blockWidth);
    elem._yy = Math.round(centerY / platformer.blockHeight);

    platformer.objectContainer.style.transform = `translate3d(${-1*elem._x + 240}px, ${-1*elem._y + 320}px, 0)`;
  },

  getBlock: function(_x, _y, ceil) {
    let block_x = (ceil) ? Math.ceil(_x / platformer.blockWidth) : Math.floor(_x / platformer.blockWidth);
    let block_y = Math.floor(_y / platformer.blockHeight);

    if (debug) {
      let centerY = block_y * platformer.blockHeight;
      let centerX = block_x * platformer.blockWidth;
      platformer.spriteContainerCTX.beginPath();
      platformer.spriteContainerCTX.lineWidth = 1;
      platformer.spriteContainerCTX.moveTo(centerX, centerY);
      platformer.spriteContainerCTX.strokeStyle = 'rgb(255,255,255)';
      platformer.spriteContainerCTX.strokeRect(centerX, centerY, platformer.blockWidth, platformer.blockHeight);
    }
    if (typeof(platformer.level[block_y]) === 'undefined') return ' '; // out of bounds ?
    if (platformer.level[block_y][block_x] === 'E') return ' ';
    return platformer.level[block_y][block_x];
  },

  getSurroundings: (el) => {
    let dir = (el._direction) ? el._direction : el._lastDirection;

    let getLeft = platformer.getBlock(((el._x - el._collisionYX[1]) + dir[0] * el._horizontalSpeed), el._y);
    let getRight = platformer.getBlock(((el._x + el._collisionYX[1]) + dir[0] * el._horizontalSpeed), el._y);

    let getTop =    platformer.getBlock(el._x, ((el._y - el._collisionYX[0]) + dir[1] * el._horizontalSpeed));
    let getBottom =    platformer.getBlock(el._x, ((el._y + el._collisionYX[0]) + dir[1] * el._horizontalSpeed));

    return {
      L: getLeft,
      R: getRight,
      T: getTop,
      B: getBottom
    }
  }
}



window.onload = function() {
  platformer.init();
}


document.onkeydown = function(e) {
  let k;
  if (!e) e = window.event
  if (e.keyCode) k = e.keyCode;
  else if (e.which) k = e.which;
  // left
  if (k === 37) {
    platformer.player._direction[0] = -1;
  }
  // right
  if (k === 39) {
    platformer.player._direction[0] = 1;
  }
  // up
  if (k === 38) {
    platformer.player._direction[1] = -1;
  }
  // down
  if (k === 40) {
    platformer.player._direction[1] = 1;
  }
  // Space
  if (k === 32) {
    platformer.placeBomb(platformer.player._x, platformer.player._y);
  }
  //		return false;
}

document.onkeyup = function(e) {
  let k;
  if (!e) e = window.event
  if (e.keyCode) k = e.keyCode;
  else if (e.which) k = e.which;
  platformer.player._facing = platformer.player._direction[0];
  if (k == 37) {
    platformer.player._direction[0] = 0;
    platformer.player._lastDirection[0] = -1;
  }
  if (k == 39) {
    platformer.player._direction[0] = 0;
    platformer.player._lastDirection[0] = 1;
  }
  if (k == 38) {
    platformer.player._direction[1] = 0;
    platformer.player._lastDirection[1] = -1;
  }

  if (k == 40) {
    platformer.player._direction[1] = 0;
    platformer.player._lastDirection[1] = 1;
  }

  //		return false;
}

function timestamp() {
  if (window.performance && window.performance.now)
    return window.performance.now();
  else
    return new Date().getTime();
}

let fps = 60,
  step = 1 / fps,
  dt = 0,
  now, last = timestamp();

function frame() {
  if (platformer.player._died) return;
  now = timestamp();
  dt = dt + Math.min(1, (now - last) / 1000);
  while (dt > step) {
    dt = dt - step;
    render();
  }
  last = now;
  requestAnimationFrame(frame);
}

function render() {
  platformer.spriteContainerCTX.clearRect(0, 0, platformer.levelWidth * platformer.blockWidth, platformer.levelHeight * platformer.blockHeight);

  platformer.enemies.map(function(i) {
    // Remove dead enemies
    if(i._dead) {
      let removeFromArray = platformer.enemies.indexOf(i);
      if (platformer.enemies[removeFromArray] === i) {
        platformer.enemies.splice(removeFromArray, 1);
      }
    }
    platformer.moveBlock(i);
  });

  platformer.movePlayer(platformer.player);
}
