class Ball {

  constructor(ctx, canvas, size) {
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
    this.size = size;
    this.positionX = 0;
    this.positionY = 0;
    this.state = new State1();
  }

  setState(state) {
    this.state = state;
  }

  print(){
    this.state.print(this);
  }

  init() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillRect(this.positionX, this.positionY, this.size, this.size);
  }
}

class State1 {
  print(ball) {
    ball.init();

    if (ball.positionX < (ball.width - ball.size)) {
      ball.positionX += ball.size;
    } else {
      ball.setState(new State2());
    }
  }
}

class State2 {
  print(ball) {
    ball.init();

    if (ball.positionY < (ball.height - ball.size)) {
      ball.positionY += ball.size;
    } else {
      ball.setState(new State3());
    }
  }
}

class State3 {
  print(ball) {
    ball.init();

    if (ball.positionX > 0) {
      ball.positionX -= ball.size;
    } else {
      ball.setState(new State4());
    }
  }
}

class State4 {
  print(ball) {
    ball.init();

    if (ball.positionY > 0) {
      ball.positionY -= ball.size;
    } else {
      ball.setState(new State1());
    }
  }
}


const canvas = document.querySelector('#ballstate');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';

const ball = new Ball(ctx, canvas, 20);
setInterval(() => {
  ball.print();
}, 100);