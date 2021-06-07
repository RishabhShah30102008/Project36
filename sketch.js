var dog, dogImage, happyDog, database, foodS, foodStock;

var feedTheDog, addTheFood;

var fedTime, lastFed;

var feed,addFood;

var foodObj;

var milkBottle, milkBottleImage, Milk;

function preload()
{

  dogImage = loadAnimation("Images/dogImg.png");
  happyDog = loadAnimation("Images/dogImg1.png");
  milkBottleImage = loadImage("Images/Milk.png");

}

function setup() {

  database = firebase.database();

	createCanvas(700, 500);
  
  foodObj = new Food();

  foodStock = database.ref('Food')
  foodStock.on("value", readStock);

  dog = createSprite(490,250,20,20);
  dog.addAnimation("abc",dogImage);
  dog.scale = 0.2;

  addTheFood = createButton("Add food");
  addTheFood.position(800,95);
  addTheFood.mousePressed(addFood);

  feedTheDog = createButton("Feed the dog");
  feedTheDog.position(700,95);
  feedTheDog.mousePressed(feedDog);

}


function draw() {
  background(46,139,87);

  drawSprites();

  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);

  if(lastFed>=12){

    text("Last Feed : "+ lastFed % 12 + " PM", 350,30);

   } else if(lastFed==0){

     text("Last Feed : 12 AM",350,30);

   } else{

     text("Last Feed : "+ lastFed + " AM", 350,30);

   }

}

function readStock(data){

  foodS = data.val();
  foodObj.updateFoodStock(foodS);

}

function feedDog(){ 
  
  dog.addAnimation("abc",happyDog);

  milkBottle = createSprite(420,290,20,20);
  milkBottle.addImage(milkBottleImage);
  milkBottle.scale = 0.07;

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);

  database.ref('/').update({

    Food : foodObj.getFoodStock(),
    FeedTime : hour ()

  });
  
}

function addFood(){

  foodS++

  database.ref('/').update({

    Food : foodS

  })

}