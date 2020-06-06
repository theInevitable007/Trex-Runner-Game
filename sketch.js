var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOver,restart,gameOverImg,restartImg;

var gameState;

var PLAY;
var END;

var checkPoint,die,jump;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  checkPoint = loadSound("checkPoint.mp3");
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");

}

function setup() {
  createCanvas(600, 200);
  
  score = 0;
 
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + (3 * score)/100);
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  
  
  PLAY = 1;
  END = 0;
  
  gameState = PLAY;
  
  gameOver = createSprite(280,70);
  gameOver.addImage("gameLost",gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(300,100);
  restart.addImage("restart",restartImg);
  restart.scale = 0.5;
  restart.visible = false;
}

function draw() {
  background(180);
  text("Score: "+ score, 500,50);

  
  if(gameState === PLAY){
    
   score = score + Math.round(getFrameRate()/60);
   trex.velocityY = trex.velocityY + 0.8;
   spawnClouds();
   spawnObstacles();
    
    if(score % 100 === 0 && score > 0){
      checkPoint.play();
    }  

    if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
   if(keyDown("space")&& trex.y >= 160 ) {
    trex.velocityY = -10;
     jump.play();
 }
    if(trex.isTouching(obstaclesGroup)){
      gameState = END;
      die.play();
  } 
}   
  
  else if(gameState === END) {
    
    
    gameOver.visible = true;
    restart.visible = true;
   
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
  
    trex.changeAnimation("collided",trex_collided);
    
    
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)){
       
        reset();
    
   }
  }
  trex.collide(invisibleGround);
  //console.log(trex.y);
  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
  
    cloud.lifetime = 200;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
  }
  
}



function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = ground.velocityX;
    
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;      
    }
    trex.depth = obstacle.depth + 1;
    
            
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
  }
}



function reset(){
  
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  ground.velocityX = -(6 + (3 * score /100));
  
  score = 0;
  
}




