//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var dogImage1, dogImage2;
function preload()
{
  //load images here
  dogImage1 = loadImage("images/dogImg.png")
  dogImage2 = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(225, 225, 10, 10)
  dog.scale=0.5;
  dog.addImage("dog",dogImage1)
  //happyDog.addImage("happyDog",dogImage2)
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
background(46, 139, 87);
if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage("dog", dogImage2)
}
  drawSprites();
  //add styles here
  fill("Yellow")
  stroke("Black")
  text("Food Remaining: " + foodS, 170, 200)

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }  else{
      x=x-1
    }
  database.ref('/').update({
    Food:x
  })
}
