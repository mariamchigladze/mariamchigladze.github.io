var s;
var scl = 30;
var food;
playfield = 700;
let foodImage, snakeImage
function preload() {
  foodImage = loadImage('rat.png')
  snakeImage = loadImage('snake.png')
}

function setup() {
  createCanvas(playfield, playfield);
  background(0,191,255);
  s = new Snake();
  frameRate (15);
  pickLocation();
}


function draw() {
  background(0,191,255);
  scoreboard();
  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  s.update();
  s.show();

  fill (20,0,150);
  image(foodImage, food.x,food.y, 50, 25);
}

function pickLocation() {
  var cols = floor(playfield/scl);
  var rows = floor(playfield/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);

  for (var i = 0; i < s.tail.length; i++) {
    var pos = s.tail[i];
    var d = dist(food.x, food.y, pos.x, pos.y);
    if (d < 1) {
      pickLocation();
    }
  }
}

function scoreboard() {
  fill(0);
  textFont("Times New Romans");
  textSize(18);
  text("Score: ", 10, 640);
  text("Highscore: ", 450, 640)
  text(s.score, 70, 640);
  text(s.highscore, 540, 640)
}


function keyPressed() {
  if (keyCode === UP_ARROW){
      s.dir(0, -1);
  }else if (keyCode === DOWN_ARROW) {
      s.dir(0, 1);
  }else if (keyCode === RIGHT_ARROW) {
      s.dir (1, 0);
  }else if (keyCode === LEFT_ARROW) {
      s.dir (-1, 0);
  }
}

function Snake() {
  this.x =0;
  this.y =0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  this.score = 1;
  this.highscore = 1;

  this.dir = function(x,y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      this.score++;
      text(this.score, 150, 660);
      if (this.score > this.highscore) {
        this.highscore = this.score;
      }
      text(this.highscore, 540, 660);
      return true;
    } else {
      return false;
    }
  }

  this.death = function() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.total = 0;
        this.score = 0;
        this.tail = [];
      }
    }
  }

  this.update = function(){
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length-1; i++) {
        this.tail[i] = this.tail[i+1];
    }

    }
    this.tail[this.total-1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed*scl;
    this.y = this.y + this.yspeed*scl;

    this.x = constrain(this.x, 0, playfield-scl);
    this.y = constrain(this.y, 0, playfield-scl);


  }
  this.show = function(){
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
        image(snakeImage, this.tail[i].x, this.tail[i].y, scl, scl);
    }

    image(snakeImage, this.x, this.y, scl, scl);
  }
}
