var boy, boyImg
var beach1,beach2, beachImg;
var invisibleGround;
var o1, o2, o3
var score = 0
var PLAY = 1, END = 0
var gameState = PLAY

function preload(){
boyImg = loadAnimation("run1.png","run2.png","run3.png","run4.png","run5.png","run6.png","run7.png","run8.png","run9.png","run10.png","run11.png","run12.png",)
beachImg = loadImage("background_beach.png")
o1 = loadImage ("obstacle1.png")
o2 = loadImage ("obstacle2.png")
o3 = loadImage ("obstacle3.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  beach1=createSprite(width/2, height/2, width,height)
  beach1.addImage(beachImg);
  beach1.velocityX = -4
  beach1.scale=0.5

  beach2=createSprite(width+width/2, height/2, width,height)
  beach2.addImage(beachImg);
  beach2.velocityX = -4
  beach2.scale=0.5
  boyImg.frameDelay=3



  boy = createSprite(50,height-120,20,50);
  boy.addAnimation("running",boyImg)
  boy.scale=0.3



  invisibleGround=createSprite(width/2,height-50,width,20 )
  invisibleGround.visible=false;
}


function spawnobstacle(){
  if(frameCount%120==0){
    var obstacle = createSprite(width,height-150);
    var x=Math.round(random(1,3));
    switch(x){
      case 1:obstacle.addImage(o1)
      break;
      case 2:obstacle.addImage(o2)
      break;
      case 3:obstacle.addImage(o3)
      break;
    }
    obstacle.velocityX = -4
    obstacle.lifetime= 600
    obstacle.scale= 0.7
  }
  obstacleGroup.add(obstacle)
}


function draw() {
  background("white")
  textSize(30)
   text("score="+score, width-200, 70)
   score.depth = background.depth +1
   if (gameState===PLAY)
 score+=Math.round(getFrameRate()/60)

 if(beach1.x<-width/2){
  beach1.x=width/2
 }
 if(beach2.x<width/2){
  beach2.x=width+width/2
 }
 if (touches.length>0||(keyDown("space")&& boy.y>height-200)){
  boy.velocityY = -15;
  touches = []
  console.log(boy.y)
}
boy.velocityY+=0.8;

if (obstacleGroup.isTouching(boy)){
  gameState = END
}
if (gameState===END){
  ground.velocityX = 0
  boyvelocityY=0

  obstacleGroup.setLifetimeEach(-1)
  obstacleGroup.setVelocityXEach(0)
}
 
spawnobstacle()

boy.collide(invisibleGround )
  drawSprites();
}

