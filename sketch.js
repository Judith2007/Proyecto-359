var ballon,balloonImage1,balloonImage2;
// crea aquí la base de datos y la variable de posición 
var database;
var height;

function preload(){
  bg =loadImage("cityImage.png");
  balloonImage1=loadAnimation("hotairballoon1.png");
  balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png","hotairballoon1.png","hotairballoon2.png","hotairballoon2.png","hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
}

//Función para configurar el entorno inicial
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  ballon=createSprite(250,450,150,150);
  ballon.addAnimation("hotAirBalloon",balloonImage1);
  ballon.scale=0.5;

  var balloonHeigth=database.ref('ballon/height')
  balloonHeigth.on("value",readHeight,showError)

}

// función para mostrar la Interfaz del Usuario (UI por sus siglas en inglés)
function draw() {
  background(bg);

   //escribe el código para mover el globo aerostático en dirección hacia la izquierda
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0)
    //ballon.addAnimation("hotAirBalloon",balloonImage2);
   
  }
  //escribe el código para mover el globo aerostático en dirección hacia la derecha
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0)
    //ballon.addAnimation("hotAirBalloon",balloonImage2);
  }
   //escribe el código para mover el globo aerostático en dirección ascendente
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10)
   //ballon.addAnimation("hotAirBalloon",balloonImage2);
   //ballon.scale=ballon.scale-0.01;
  }
   //escribe el código para mover el globo aerostático en dirección descendente
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,10)
   //ballon.addAnimation("hotAirBalloon",balloonImage2);
  // ballon.scale=ballon.scale-0.04;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**¡Utiliza las teclas de flecha para mover el globo aerostático!",40,40);
}

function updateHeight(x,y){
  database.ref('ballon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  ballon.x = height.x;
  ballon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database")
 }

 