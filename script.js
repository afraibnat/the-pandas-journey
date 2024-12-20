/* VARIABLES */
let catcher, fallingObject, avoidObject, avoidObject2;
let backgroundImg, catcherImg, fallingObjectImg, avoidObjectImg, avoidImg;
let font1, font2;
let playButton, directionsButton, backButton;
let score = 0;
let screen = 0;
let level = 1;

/* PRELOAD LOADS FILES */
function preload(){
  // sprite images
  backgroundImg = loadImage('assets/download (2).jpg');
  catcherImg = loadImage('assets/panda.png');
  fallingObjectImg = loadImage('assets/cookie.png');
  avoidObjectImg = loadImage('assets/fish.png');
  avoidImg = loadImage('assets/peel.png');
  
  // fonts
  font1 = loadFont('assets/Hunny Bummy.ttf');
  font2 = loadFont('assets/firsttext.TTF')
  
  // winScreen panda and looseScreen panda
  winpanda = loadImage('assets/standpanda.png');
  loosepanda = loadImage('assets/loose.png');

  // homeScreen animals
  animal1 = loadImage('assets/animal.png');
  animal2 = loadImage('assets/animal2.png');
  animal3 = loadImage('assets/animal3.png');
  animal4 = loadImage('assets/animal4.png');

  // images
  decoration = loadImage('assets/star.png');
  sparkle = loadImage('assets/sparkle.png');
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,420);

  //Resize images
  catcherImg.resize(100, 0);
  fallingObjectImg.resize(50, 0);
  avoidObjectImg.resize(50, 0);
  avoidImg.resize(50,0);
  winpanda.resize(100, 0);
  loosepanda.resize(130,0);
  animal1.resize(150, 0);
  animal2.resize(150,0);
  animal3.resize(150, 0);
  animal4.resize(150, 0);
  decoration.resize(30, 0);
  sparkle.resize(30, 0);

  homeScreen();
}

/* DRAW LOOP REPEATS */
function draw() {
  if (screen == 0) {
    if (directionsButton.mouse.presses()) {
      screen = 1;
      directionScreen();
    } else if (playButton.mouse.presses()) {
      screen = 2;
      playScreenAssets();
    }
  }

  if (screen == 1) {
    if (backButton.mouse.presses()) {
      //screen 0 is home screen
      screen = 0;
      homeScreen();
      backButton.pos = { x: -300, y: -300 };
    }
  }

  if (screen == 2) {
    background(backgroundImg);
    if(level ==1) {
      level1Assets();
    } else if(level ==2){
      //playScreenAssets();
      level2Assets();
    } else if(level == 3){
      level3Assets();
    }
  
    //If sprite reach bottom, move back to random position at top
    if (fallingObject.y >= height) {
      fallingObject.y = 0;
      fallingObject.x = random(50, 370);
      fallingObject.vel.y = random(3, 5);
    } 

    if (avoidObject2.y >= height) {
      avoidObject2.y = 0;
      avoidObject2.x = random(50,370);
      avoidObject2.vel.y = (2,4);
    }

    if (avoidObject.y >= height) {
      avoidObject.y = 0;
      avoidObject.x = random(50, 370);
      avoidObject.vel.y = random(2, 4);
    }

    //Move catcher
    if (kb.pressing("left")) {
      catcher.vel.x = -3;
    } else if (kb.pressing("right")) {
      catcher.vel.x = 3;
    } else {
      catcher.vel.x = 0;
    }

// Stop catcher at edges of screen
    if (catcher.x < 50) {
      catcher.x = 50;
    } else if (catcher.x > 350) {
      catcher.x = 350;
    }

//If sprites collide with catcher, move back to random position at top
    if (fallingObject.collides(catcher)) {
      fallingObject.y = 0;
      fallingObject.x = random(50, 370);
      fallingObject.vel.y = random(3, 5);
      fallingObject.direction = "down";
      fallingObject.rotationLock = true;
      score += 1;
    }

    if (avoidObject2.collides(catcher)) {
      avoidObject2.y = 0;
      avoidObject2.x = random(50, 370);
      avoidObject2.velocity.y = random(2, 4);
      avoidObject2.direction = "down";
      avoidObject2.rotationLock = true;
      score -= 1;
    }

    if (avoidObject.collides(catcher)) {
      avoidObject.y = 0;
      avoidObject.x = random(50,370);
      avoidObject.velocity.y = random(2,4);
      avoidObject.direction = "down";
      avoidObject.rotationLock = true;
      score -= 1;
    }

  //If sprites collide, keep them falling downwards
    if (fallingObject.collides(avoidObject)) {
      fallingObject.direction = "down";
      avoidObject.direction = "down";
    }

    if (fallingObject.collides(avoidObject2)) {
      fallingObject.direction = "down";
      avoidObject2.direction = "down";
    }
  
 //Score text and counter
    fill("#55483F");
    textFont(font2);
    textSize(25)
    text("Cookies: ", 95, 35);
    fill("#7D6A5D");
    textFont(font1);
    textSize(30);
    text(" " + score, 175, 35);

  // draw levels to screen
    fill("#55483F")
    textFont(font2);
    textSize(25)
    text("Level: ", 80, 70);
    fill("#7D6A5D");
    textFont(font1);
    textSize(30);
    fill("#7D6A5D");
    text(" " + level+"/3",
       155, 70);

    if (score == -1){
      looseScreen();
    }

    //use when adjusting collider sprites:  
    //allSprites.debug = mouse.pressing();

    if (level == 1 && score == 5) {
    level = 2;
    score = 0;
  } else if(level ==2 && score == 5) {
    level = 3;
    score= 0;
  } else if(level ==3 && score == 10) {
    winScreen();
      
    if (keyCode == 13){
      homeScreen();
  }
    
    }
  }
} //end of draw


//functions

function homeScreen() {
  background(backgroundImg);

  textAlign(CENTER);
  fill("#55483F");
  textSize(35);
  textFont(font2);
  text(" The Panda's \nJourney", width/2 + 5, height/2 - 150);
  textSize(16);
  textFont(font1);
  text("Follow the journey of a panda \nwith the goal to collect enough cookies \nto share with her friends! \nNavigate carefully, gathering the \nright amount the panda needs!",width / 2 - 3, height / 2 - 70);
  
  //Create play button
  textFont(font2);
  playButton = new Sprite(275,280,100,70, 'k');
  playButton.color = "white";
  playButton.textColor = "#55483F";
  playButton.textSize = 20;
  playButton.text = "Play";

  //Create directions button
  directionsButton = new Sprite(128,280,140,70, 'k');
  directionsButton.color = "white";
  directionsButton.textColor = "#55483F";
  directionsButton.textSize = 17;
  directionsButton.text = "Directions";

  // animal images
  image(animal4, -100, 310);
  image(animal1, width/2 - 190, 320);
  image(winpanda, 145, 330);
  image(animal2, 232, 310);
  image(animal3, 350, 310);

  // images
  image(decoration, 10, 100);
  image(decoration, 35, 170);
  image(sparkle, 10, 200);

  image(decoration, 353, 120);
  image(decoration, 343, 250);
  image(decoration, 320, 170);
  image(sparkle, 355, 200);
}

function directionScreen() {
  background(backgroundImg);
  
  // off screen
  playButton.pos = { x: -200, y: -100 };
  directionsButton.pos = { x: -500, y: -100 };
  
  // directions to screen
  fill("#55483F");
  textFont(font1);
  textSize(17);
  textAlign(CENTER);
  text("In order to collect enough cookies \nfor the panda's friends, you will need to play 3 levels. \nIn total, there are 20 cookies you need to collect.\nEach level requires you to collect a \ncertain amount, listed at the top, \nbefore you can proceed to the next one.", 200, 50);
  text("Avoid the fish bones and banana peels \nor you will loose points.", 200, 190);
  text("To move the panda, \npress the left and right arrow keys!", 200, 245);
  textSize(12);
  text("Images from pixabay.com", 200, 290);
  
  //Create back button
  textFont(font2);
  backButton = new Sprite(200,340,170,70, "k");
  backButton.color = "white";
  backButton.textColor = "#55483F";
  backButton.textSize = 15;
  backButton.text = "Back to Home";

  // images
  image(decoration, 35, 225);
  image(sparkle, 10, 250);

  image(decoration, 343, 250);
  image(decoration, 320, 210);
  image(sparkle, 355, 200);
}

function playScreenAssets() {
  //Create catcher 
  playButton.pos = { x: -100, y: -100};
  directionsButton.pos = { x: -500, y: -100 };
  
  catcher = new Sprite(catcherImg, 200,380,100,20,"k");
  
  //Create falling object
  fallingObject = new Sprite(fallingObjectImg, 150,0,50);
  fallingObject.vel.y = 2;
  fallingObject.rotationLock = true;

  avoidObject2 = new Sprite(avoidImg, 250, 0, 10);
  avoidObject2.vel.y = 2;
  avoidObject2.rotationLock = true;

  // creating avoid object
  avoidObject = new Sprite(avoidObjectImg, 50, 0, 10);
  avoidObject.vel.y = 2;
  avoidObject.rotationLock = true;
}

// when player looses
function looseScreen() {
  background(backgroundImg);

  // off screen
  catcher.pos = {x: 600, y: -300};
  fallingObject.pos = {x: -100, y: 0};
  avoidObject.pos = {x: -100, y: 0};
  avoidObject2.pos = { x: -100, y: 0};

  textSize(45);
  fill("#55483F");
  textFont(font2);
  text("Game Over", width/2 - 4, height/2 - 120);
  textSize(25);
  fill("#55483F");
  textFont(font1);
  textSize(26);
  text("You did not collect all the cookies!", width/2 - 7, height/2 - 85);
  fill("#7D6A5D");
  textSize(22);
  text("Even though you did not meet \nthe panda's goal, you can \nalways try again!", width/2 - 5, height/2 - 50);
  fill("#55483F");
  textSize(26);
  text(" Press ENTER to play again!", width/2 - 10, 260);
  // images
  image(loosepanda, width/2 - 80, 280);

  image(decoration, 10, 150);
  image(decoration, 35, 170);
  image(sparkle, 10, 200);
  
  image(decoration, 353, 160);
  image(decoration, 343, 250);
  image(decoration, 320, 170);
  image(sparkle, 355, 200);

  if(keyCode == 13) {
    restart();
}
}

// when player wins
function winScreen() {
  background(backgroundImg);

  // off screen
  catcher.pos = {x: 600, y: -300};
  fallingObject.pos = {x: -100, y: 0};
  avoidObject.pos = {x: -100, y: 0};
  avoidObject2.pos = {x: -100, y: 0};

  textSize(50);
  fill("#55483F");
  textFont(font2);
  text("You Won!", width/2 - 4, 80)
  fill("#7D6A5D");
  textSize(22);
  textFont(font1);
  text("Good job helping the panda collect \nall of the cookies! Now everyone has \nenough to share. All the animals are \nthankful and appreciate the gesture!", width/2 - 10, 117);
  textSize(23);
  fill("#55483F");
  textFont(font1);
  text(" Press ENTER to return \nto the homescreen!", width/2 - 10, 240);
  // images
  image(winpanda, 145, 290);

  image(decoration, 10, 230);
  image(decoration, 35, 260);
  image(sparkle, 10, 290);

  image(decoration, 343, 250);
  image(sparkle, 355, 220);
}

// star images on homescreen onto playscreen
function images() {
  image(decoration, 10, 100);
  image(decoration, 35, 170);
  image(sparkle, 10, 200);

  image(decoration, 353, 120);
  image(decoration, 343, 250);
  image(decoration, 320, 170);
  image(sparkle, 355, 200);
}

// level 1
function level1Assets() {
  fill("#55483F");
  textSize(22);
  text("Collect 5 cookies to\n reach level 2", width/2 + 100, 35);

  images();
}

// level 2
function level2Assets() {
  fill("#55483F");
  textSize(22);
  text("Collect 5 cookies to\n reach level 3", width/2 + 100, 35);

  images();
}

// level 3
function level3Assets() {
  fill("#55483F");
  textSize(20);
  text("Collect 10 cookies to\n meet the panda's goal", width/2 + 95, 35);

  images();
}

// everything resets
function restart() {
  score = 0;
  level =1;

  catcher.pos = { x: 200, y: 380};
  
  fallingObject.y = 0;
  fallingObject.x = random(50, 350);
  fallingObject.vel.y = random(3, 5);
  fallingObject.direction = "down";

  avoidObject.y = 0;
  avoidObject.x = random(50, 350);
  avoidObject.vel.y = random(2, 4);
  avoidObject.direction = "down";

  avoidObject2.y = 0;
  avoidObject2.x = random(50, 350);
  avoidObject2.vel.y = random(2, 4);
  avoidObject2.direction = "down";
}
