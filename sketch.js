//declare variables
var ground, groundimg, bow, bowimg, redballoon, redballoonimg, pinkballoon, pinkballoonimg, blueballoon, blueballoonimg, greenballoon, greenballoonimg, arrow, arrowimg, cloud, cloudimg, sun, sunimg, number, rand, line1, gameover, reset, gameoverimg, resetimg;
var score = 0;
var gameState = "play";
var value = 0; 
var greenGroup, redGroup, blueGroup, pinkGroup, arrowGroup, cloudGroup;

//load images

function preload(){
  
  bowimg = loadImage("bow0.png");
  sunimg = loadImage("sun.png");
  backgroundimg = loadImage("background0.png");
  arrowimg1 = loadImage("arrow0.png");
  arrowimg2 = loadImage("arrow10.png");
  arrowimg3 = loadImage("arrow20.png");
  arrowimg4 = loadImage("arrow30.png");
  cloudimg = loadImage("cloud.png");
  redballoonimg = loadImage("red_balloon0.png");
  blueballoonimg = loadImage("blue_balloon0.png");
  pinkballoonimg = loadImage("pink_balloon0.png");
  greenballoonimg = loadImage("green_balloon0.png");  
  gameoverimg = loadImage("gameover.png");
  resetimg = loadImage("reset.png");
}

//create canvas and sprites

function setup() {
  createCanvas(600, 600);
  
  background = createSprite(0,0,600,600);
  background.addImage(backgroundimg);
  background.scale = 3;
  
  bow = createSprite(560, 250, 50, 50);
  bow.addImage(bowimg);
  bow.scale = 1;

  sun = createSprite(40, 40, 100, 100);
  sun.addImage(sunimg);
  sun.scale = 0.15;
  
  line1 = createSprite(640, 300, 1, 600);
  line1.visible = true;
  
    gameover = createSprite(300, 235);
  gameover.addImage(gameoverimg);
  gameover.scale = 0.8;
  reset = createSprite(300, 375);
  reset.addImage(resetimg);
  reset.scale = 1;

  
  console.log("Hello " + "World" + 10);
  
  background.velocityX = -3;
  
  greenGroup = createGroup();
  redGroup = createGroup();
  blueGroup = createGroup();
  pinkGroup = createGroup();
  arrowGroup = createGroup();
  cloudGroup = createGroup();
  

  fill("black");
  strokeWeight = 2;
  stroke("black");
}

//execute code

function draw() { 
  
  camera.position.x = bow.x;
  camera.position.y = bow.y;
  
  if(gameState === "play"){
    
      background.velocityX = -3;
    
        gameover.visible = false;
    reset.visible = false;

  if (background.x < 0){
    background.x = background.width/2;
  }
  
  if (arrowGroup.isTouching(redGroup)) {
    redGroup.destroyEach();
    score = score + 1;
  } else if (arrowGroup.isTouching(greenGroup)) {
    greenGroup.destroyEach();
    score = score + 2;  
  } else if (arrowGroup.isTouching(blueGroup)) {
    blueGroup.destroyEach();
    score = score + 3;  
  } else if (arrowGroup.isTouching(pinkGroup)) {
    pinkGroup.destroyEach();
    score = score + 4;  
  }
  
  bow.depth = sun.depth + 1;
  
  if (keyDown("space") && value === 0) {
    createArrow();
    value = 1;
  }
  
  if (keyWentUp("space")) {
      value = 0;
  }
  
  if (redGroup.isTouching(line1)) {
    redGroup.destroyEach();
    score = score - 1;
  } else if (blueGroup.isTouching(line1)) {
    blueGroup.destroyEach();
    score = score - 3;
  } else if (greenGroup.isTouching(line1)) {
    greenGroup.destroyEach();
    score = score - 2;
  } else if (pinkGroup.isTouching(line1)) {
    pinkGroup.destroyEach();
    score = score - 4;
  }
    
    if(score <= -10){
      gameState = "end";
    }
  
  spawnclouds();
  
  bow.y = World.mouseY;
  
  spawnBalloons();
  
  } else if (gameState === "end") {
    background.velocityX = 0;
    
    gameover.visible = true;
    
    reset.visible = true;
      
      redGroup.setVelocityXEach(0);
    blueGroup.setVelocityXEach(0);
    pinkGroup.setVelocityXEach(0);
    greenGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
          redGroup.setLifetimeEach(-1);
    blueGroup.setLifetimeEach(-1);
    pinkGroup.setLifetimeEach(-1);
    greenGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    
   if (mousePressedOver(reset)) {
      resetgame();
    }
  }
      drawSprites();
  text("Score: "+ Math.round(score), 500,50); 
  text("If your score is -10 or less, you lose.", width/2.9, height - height + height-30);
}

function createArrow() {
  arrow = createSprite(360, 100, 5, 10);
  rand = Math.round(random(1, 4));
  
  if (rand === 1) {
    arrow.addImage(arrowimg1);  
    arrow.scale = 0.1;
  } else if (rand === 2) {
    arrow.addImage(arrowimg2);
    arrow.scale = 0.3;
  } else if (rand === 3) {
    arrow.addImage(arrowimg3);
    arrow.scale = 0.1;
  } else if (rand === 4) {
    arrow.addImage(arrowimg4) 
    arrow.scale = 0.2;
  }
  arrow.velocityX = -6;
  arrow.y = bow.y;
  arrow.x = bow.x - 20;
  arrow.lifetime = 100;
  arrowGroup.add(arrow);
  return arrow;
}

function spawnBalloons() {
        if (World.frameCount % 40 === 0) {
    var balloon;
    
    number = Math.round(random(1, 4));
    switch(number) {
      
      case 1: 
          balloon = createSprite(Math.round(random(35, 420)), Math.round(random(20, 580)), 10, 10);
          balloon.addImage(greenballoonimg);
          balloon.scale = 0.1;
          balloon.velocityX = Math.round(random(3.5, 8.5));
          balloon.lifetime = 100;
          greenGroup.add(balloon);
          break;
      case 2:
          balloon = createSprite(Math.round(random(35, 420)), Math.round(random(20, 580)), 10, 10);
          balloon.addImage(blueballoonimg);
          balloon.scale = 0.1;
          balloon.velocityX = Math.round(random(4.5, 9.5));
          balloon.lifetime = 100;
          blueGroup.add(balloon);
          break;
      case 3:
          balloon = createSprite(Math.round(random(35, 420)), Math.round(random(20, 580)), 10, 10);
          balloon.addImage(redballoonimg);
          balloon.scale = 0.1;
          balloon.velocityX = Math.round(random(2.5, 7.5));
          balloon.lifetime = 100;
          redGroup.add(balloon);
          break;
      case 4:
          balloon = createSprite(Math.round(random(35, 420)), Math.round(random(20, 580)), 10, 10);
          balloon.addImage(pinkballoonimg);
          balloon.scale = 1.3;
          balloon.velocityX = Math.round(random(5.5, 10.5));
          balloon.lifetime = 100;
          pinkGroup.add(balloon);
          break;
      default: break;
    }

          bow.depth = 5000;
          sun.depth = bow.depth - 1000;
          balloon.depth = sun.depth + 1;
          gameover.depth = sun.depth + 2;
          reset.depth = gameover.depth;
      }
}

function spawnclouds() { 
  if (frameCount % 70 === 0) {
    cloud = createSprite(600, 150, 40, 10);
    cloud.addImage(cloudimg);
    cloud.scale = 0.2;
    cloud.y = Math.round(random(10, 85));
    cloud.velocityX = -3;
    cloud.depth = sun.depth -1;
    cloud.lifetime = 300;
    cloudGroup.add(cloud);
  }
}

function resetgame(){
  gameState = "play";
  score = 0;
    redGroup.destroyEach();
    blueGroup.destroyEach();
    pinkGroup.destroyEach();
    greenGroup.destroyEach();
    cloudGroup.destroyEach();
}
