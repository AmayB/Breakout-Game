var ball;
var score = 0;
var lives = 3;
var gamestate = "serve";
ball = createSprite(200,200,10,10);

var paddle = createSprite(200, 350, 100, 10);
paddle.shapeColor = "blue";

createEdgeSprites();

var bricks = createGroup();

function createBrickRow(y, color) {
  for(var c=0; c<6; c++)
  {
    var brick = createSprite(65+54*c,y,50, 25);
    brick.shapeColor = color;
    bricks.add(brick);
  }
}

createBrickRow(70, "red");
createBrickRow(70+29, "orange");
createBrickRow(70+29+29, "yellow");
createBrickRow(70+29+29+29, "green");

function draw() {
  background("black");
  
  text("Score: "+score,40,25);
  text("Lives: "+lives, 40, 45);
  
  if(gamestate == "serve"){
    text("Click to serve.", 120,250);
    ball.velocityX =0;
    ball.velocityY =0;
    ball.x = 200;
    ball.y = 200;
  }
  else if(gamestate =="end") {
    text("Game Over!!!", 150, 250);
    ball.remove;
  }
  else {
    gameplay();
  }
  
  drawSprites();
}

function mousePressed()
{
  ball.velocityX = 10;
  ball.velocityY = 6;
  
  if(gamestate == "serve"){
    gamestate = "play";
    ball.velocityY = -7;
    ball.velocityX = -7;
  }
  
}

function brickHit(ball, brick) {
 playSound("sound://category_tap/puzzle_game_organic_wood_block_tone_tap_2.mp3");
 brick.remove();
 score = score+5;
 
 if(ball.velocityY<12 && ball.velocityY>-12)
  { ball.velocityX *= 1.05;
    ball.velocityY *= 1.05;

  }
 
}

function lifeover(){
  lives = lives - 1;
  if(lives>=1) {
    gamestate = "serve";
  }
  else {
    gamestate = "end";
  }
}

function gameplay(){
  paddle.x = World.mouseX;
  
  if(paddle.x < 60)
  {
    paddle.x = 60;
  }
    
  if(paddle.x > 340)
  {
    paddle.x = 340;
  }
  ball.bounceOff(topEdge);
  ball.bounceOff(leftEdge);
  ball.bounceOff(rightEdge);
  ball.bounceOff(bricks, brickHit);
  if(ball.bounceOff(paddle))
  {
    playSound("sound://category_tap/puzzle_game_organic_wood_block_tone_tap_1.mp3");
  }
  if(!bricks[0])
  {
    ball.velocityX = 0;
    ball.velocityY = 0;
    text("You win!!",150,200);
  }
  if(ball.isTouching(bottomEdge)) {
    lifeover();
  }
}
