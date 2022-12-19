var PLAY
var END
var gamestate=PLAY
var topImage,bottomImage,coinImage
var flappy1,flappy2,flappy3,coin,day_back,bottom_back,bottom,flappy_16,game_over,get_ready,night_back,
top
var edges
var GAMESTATE="start"
var get_readyImage,startbuttonImage,startbutton
var score=0

function preload(){
  flappybird_flying=loadAnimation("flappy1.png","flappy2.png","flappy3.png")
  flappybird_collided=loadAnimation("flappy_dead.png")
  groundImage=loadImage("day_back.png")
  bottom_backImage=loadImage("bottom_back.png")
  topImage=loadImage("top.png")
  bottomImage=loadImage("bottom.png")
  coinImage=loadImage("coin.png")
  get_readyImage=loadImage("get_ready.png")
  startbuttonImage=loadImage("start.png")
  game_overImage=loadImage("game_over.png")

  


}

function setup(){
  createCanvas(600,600)
  day_back=createSprite(350,-100)
  day_back.addImage("day_back",groundImage)
  day_back.x=day_back.width /2
  day_back.scale=8.5

  bottom_back=createSprite(300,650)
  bottom_back.addImage("bottom_back",bottom_backImage)
  bottom_back.x=bottom_back.width /2
  bottom_back.scale=7.5

 flappy = createSprite (150,160,20,50)
 flappy.addAnimation("running",flappybird_flying)
 flappy.addAnimation("collided",flappybird_collided)

 flappy.scale=3.5
 gamestart=createSprite(300,310)
 gamestart.addImage("gamestartImage",get_readyImage)
 start=createSprite(290,250)
 start.addImage(startbuttonImage)

 gameover=createSprite(300,310)
 gameover.addImage("gameoverImage",game_overImage)
 gameover.visible=false
 

  
 

  edges = createEdgeSprites();

  ob1g=new Group()
  ob2g=new Group()
  coing=new Group()
 
}

function draw(){
  background("lightgray")
  if(GAMESTATE==="start"){
flappy.visible=false
 if(mousePressedOver(start)){
   GAMESTATE="play"
   start.visible=false
   gamestart.visible=false
 }
  }
  if(GAMESTATE==="play"){
    flappy.visible=true
    day_back.velocityX=-2
    if(day_back.x < 0){
      day_back.x = day_back.width/2
    }
    bottom_back.velocityX=-2
    if(bottom_back.x < 0){
      bottom_back.x = bottom_back.width/2
    }
    if(keyDown("space")){
      flappy.velocityY=-5
    }
    flappy.velocityY+=0.5
  
   topOB()
   bottomOB()
   spawnPoints()

   if(ob1g.isTouching(flappy)||ob2g.isTouching(flappy)||flappy.y>700){
     GAMESTATE="end"
   }
   if(coing.isTouching(flappy)){
     coing[0].destroy()
     score+=5
   }
  }
  if(GAMESTATE==="end"){
    flappy.changeAnimation("collided",flappybird_collided) 
    day_back.velocityX=0
    bottom_back.velocityX=0
    flappy.velocityY=0
    ob1g.setVelocityXEach(0)
    ob2g.setVelocityXEach(0)
    coing.setVelocityXEach(0)
    gameover.visible=true
  }
  
  
  drawSprites();
  text(mouseX+","+mouseY,mouseX,mouseY);
  text("score: "+score,23,34)

}
function topOB(){
  if(frameCount%60===0){
    ob1=createSprite(700,10,300,300)
    ob1.addImage(topImage)
    ob1.scale=2.5
    ob1.velocityX=-4
    ob1.y=Math.round(random(5,20))
    ob1g.add(ob1)
  }
}
function bottomOB(){
  if(frameCount%60===0){
    ob2=createSprite(700,10,300,300)
    ob2.addImage(bottomImage)
    ob2.scale=2.5
    ob2.velocityX=-4
    ob2.y=Math.round(random(520,600))
    ob2g.add(ob2)
  }
}
function spawnPoints(){
  if(frameCount%60===0){
    coin=createSprite(700,300,300,300)
    coin.addImage(coinImage)
    coin.scale=2.5
    coin.velocityX=-4
    coing.add(coin)
  }
}
 

