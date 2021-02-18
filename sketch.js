var Rabbit, RabbitImg
var Bg, BackgroundImg
var InvisibleGround
var CornImg
var CarrotImg
var TomatoImg
var vegetablesGroup;
var soldierGroup;
var score=0
var soldier, soldierImg
var gameState="play"
var GameOver
var GameOverImg
var JumpSound;
var GameOverSound;
var GameOverSound2;
var ScoreSound;



function setup() {
  createCanvas(1300,750);
  
  Bg=createSprite(240,180,1500,800)
  Rabbit=createSprite(100, 710, 50, 50);
  GameOver=createSprite(650,300)
  
  vegetablesGroup=createGroup();
  soldierGroup=createGroup();
  Rabbit.addAnimation("Rabbit",RabbitImg)

  
  Bg.addImage(BackgroundImg)
  GameOver.addImage(GameOverImg)
  Rabbit.scale=0.5;
  
  Rabbit.setCollider("rectangle",0,0,300,200)
  
  Bg.scale=3;
  Bg.velocityX=-6;
  
  InvisibleGround=createSprite(240,710,1500,20)
  InvisibleGround.visible=false;
}

function draw() {
  background(255,255,255);  
  if(gameState==="play"){
GameOver.visible=false;
  
  if(Bg.x<200){
    Bg.x=750
  }
  Rabbit.collide(InvisibleGround)
  if(keyDown("Space")){
    Rabbit.velocityY=-10;
    JumpSound.play();
  }
  //if(Rabbit.isTouching(vegetablesGroup)){
   // vegetablesGroup.destroyEach()
   
    //score=score+1
  //}
  for(var i=0; i<vegetablesGroup.length; i++){
    if(vegetablesGroup.isTouching(Rabbit)){
      vegetablesGroup.get(i).destroy(i)
      score=score+1
      ScoreSound.play();
    }
  }
  if(score===5){
    Bg.velocity.x=-12;
    
}
Rabbit.velocityY=Rabbit.velocityY+0.3
  spawnVegetables();
  spawnSoldier();
if(Rabbit.isTouching(soldierGroup)){
  gameState="end"
  GameOverSound2.play();
}
  
}
if(gameState==="end"){
  Rabbit.velocityY=0;
  Bg.velocityX=0;
  vegetablesGroup.destroyEach()
  Rabbit.visible=false;
  GameOver.visible=true;
  
  if(keyDown("R")){
    reset();
  }
}
  drawSprites();
  textSize(20)
  fill("red")
  text("Score:"+score,1000,200)
}

function preload() {
  RabbitImg=loadAnimation("Images/Rabbit Sprite1.png","Images/Rabbit Sprite2.png","Images/Rabbit Sprite3.png","Images/Rabbit Sprite4.png","Images/Rabbit Sprite5.png","Images/Rabbit Sprite6.png")
  soldierImg=loadAnimation("Images/Soldier Sprite 1.png","Images/Soldier Sprite 2.png","Images/Soldier Sprite 3.png","Images/Soldier Sprite 4.png")
  BackgroundImg=loadImage("Images/Background Sprite.jpg")
  GameOverImg=loadImage("Images/Game Over Image.png")
  CornImg=loadImage("Images/Corn.png")
  CarrotImg=loadImage("Images/Carrot.png")
  TomatoImg=loadImage("Images/Tomato.png")
  GameOverSound=loadSound("GameOver Sound.mp3")
  GameOverSound2=loadSound("GameOver Sound2.mp3")
  JumpSound=loadSound("JumpSound.mp3")
  ScoreSound=loadSound("Score Sound.mp3")
}

function spawnVegetables() {
if (frameCount%100===0){
  var vegetables=createSprite(1300,300,200,100)
  
  vegetables.velocityX=-5;
  vegetables.scale=0.5;
  vegetables.y=Math.round(random(400,600))
  var rand=Math.round(random(1,3))
  switch(rand){
    case 1: vegetables.addImage(CornImg)
    break;
    case 2: vegetables.addImage(CarrotImg)
    break;
    case 3: vegetables.addImage(TomatoImg)
    break;
    default:break;
    
  }
  vegetablesGroup.add(vegetables)
 vegetables.lifetime=260;
 
}
}
function spawnSoldier() {
  if (frameCount%250===0){
    var soldier=createSprite(900,600,50,50)
    soldier.addAnimation("soldier",soldierImg)
    soldier.scale=0.5;
    soldier.velocityX=-6;
    soldierGroup.add(soldier)
    soldier.lifetime=220;
    

  }
  
  }
  function reset(){
    gameState="play"
    Rabbit.addAnimation("Rabbit",RabbitImg)
    Rabbit.visible=true;
    Bg.velocityX=-6;
    score=0;
    GameOver.visible=false;
  }