class particle {
  constructor(ctx,x,y) {
    this.x = 128+x+(Math.random()*32);
    this.y = 128+y+(Math.random()*32);
    this.xs = x;
    this.ys = y;
    this.size = Math.round(Math.random()*6);
    this.color = ['rgb(250,244,83)', 'rgb(246,213,72)', 'rgb(236,130,50)','rgb(227,64,38)'][Math.round(Math.random()*4)];
    this.vx = Math.random() * 4 - 2;
    this.vy = Math.random() * 4 - 2;
    this.gravity= 0;

    this.draw = () => {
        this.xs = this.x;
        this.ys = this.y;
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.fill();
        ctx.closePath();
        this.size-=0.15;
      }
    }
  }


class particles {
  constructor(x, y) {
    this.settings = {
        density: 200,
        startingX: x,
        startingY: y
    };

    let nakki = document.createElement('CANVAS');
    nakki.width = 256;
    nakki.height= 256;
    document.querySelector('.scroll-container').appendChild(nakki);
    nakki.style.position = "absolute";
    nakki.style.left = `${x-144}px`;
    nakki.style.top = `${y-144}px`;
    let ctx = nakki.getContext("2d");

    let container = [];
    for(let i=0, j=this.settings.density; i<j; i++) {
      let kakka = new particle(ctx, 10,10);
      container.push(kakka);
    }

    let perse = setInterval(() => {
      ctx.clearRect(0,0,300,300);
      if(container.length < 1 ) {
        nakki.parentNode.removeChild(nakki);
        clearInterval(perse);
        return;
      }
      for(let i=0, j=container.length; i<j; i++) {
        let kakka = container[i];
        if(kakka && kakka.size > 0 ) {
          kakka.draw();
        }
        else {container.splice(i,1)}
        }
      }, 30);
  }
}

export default particles;
