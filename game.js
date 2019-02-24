let x;
let y;
let snake;
let w;
let food;

function setup() {
  createCanvas(400, 400);
  w = width / 20;
  snake = new snakeClass();
  food = new foodClass();
  frameRate(5);
  food.pickLocation();
}


function draw() {
  background(200);
  snake.show();
  snake.crawl();
  snake.teleport();
  food.show();
  snake.lose();
  if (snake.isFoodPicked(food)) {
    food.pickLocation();
  }
}


//Змея
function snakeClass() {
  this.x = 0;
  this.y = 0;
  this.speedx = 0;
  this.speedy = 1;
  this.tail = [];
  this.foodCounter = 0;


  this.show = function() {
    fill("#5663FF");
    rect(this.x, this.y, w, w);

    for (let i = 0; i < this.tail.length; i++) {
      fill("#E8CA15");
      rect(this.tail[i].x, this.tail[i].y, w, w);
    }
  }

  this.crawl = function() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    this.tail[this.foodCounter - 1] = {
      x: this.x,
      y: this.y
    };

    this.x += this.speedx * w;
    this.y += this.speedy * w;

    this.teleport();

  };
  this.direction = function(dirx, diry) {
    this.speedx = dirx;
    this.speedy = diry;
  };

  this.lose = function() {
    for (let i = 0; i < this.tail.length; i++) {
      if (this.x == this.tail[i].x && this.y == this.tail[i].y) {
        console.log(666);
        noLoop();
        fill(255);
        rect(0, 0, 400, 130);
        fill("#1A16E8");
        rect(0, 130, 400, 130);
        fill("#FF2C00");
        rect(0, 260, 400, 130);
        textSize(60);
        text("KRIM NASH!!", 20, 180);

      }
    }
  }

  this.teleport = function() {
    if (this.x > width) {
      this.x = 0;
    };
    if (this.x < 0) {
      this.x = width - w;
    };
    if (this.y > height) {
      this.y = 0;
    };
    if (this.y < 0) {
      this.y = height - w;
    };
  };

  this.isFoodPicked = function(other) {
    if (this.x === other.x && this.y === other.y) {
      this.foodCounter += 1;
      console.log(this.tail.length);
      return true;
    }
    return false;
  }
}


//Еда
function foodClass() {
  this.x = 0;
  this.y = 0;
  let rows = width / w;
  let cols = height / w;

  this.pickLocation = function() {
    this.x = w * int(random(cols));
    this.y = w * int(random(rows));
  };

  this.show = function() {
    fill("#FF492D");
    rect(this.x, this.y, w, w);
  };
}

function keyPressed() {
  this.speed = 8;
  if (key === 'd') {
    snake.direction(+1, 0);
  }
  if (key === 'a') {
    snake.direction(-1, 0);
  }
  if (key === 's') {
    snake.direction(0, +1);
  }
  if (key === 'w') {
    snake.direction(0, -1);
  }
}