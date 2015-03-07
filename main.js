/**
 * @author Max Kerscher-Santelli
 */

var interactive = true;
var stage;
var renderer;

var map;
var level = 1;
var numOfLvls = 2;
var player;
var enemy;

var inMenu = true;

var healthMeter;
//var params = {font:"bold 4px Arial", fill: "#444444"};

var left = false;
var right = false;
var up = false;
var down = false;
var space = false;

//first function called
function initGame(){
	console.log("initializing...");
	stage = new PIXI.Stage(0xFFFFFF, interactive);
	renderer = new PIXI.WebGLRenderer(700, 700);//autoDetectRenderer(400, 300);
	document.body.appendChild(renderer.view);
	
	var startButton = new PIXI.Sprite(PIXI.Texture.fromImage("images/oldMan.png"));
	startButton.position.x = 50;
	startButton.position.y = 50;
	startButton.interactive = true;
	stage.addChild(startButton);
	
	renderer.render(stage);
	
	startButton.mousedown = function(data){
		console.log("mouse clicked");
		stage.removeChild(startButton);
		startGame();
	};
	console.log("stage should be rendered");
}
	
function startGame(){
	console.log("gamestarted");
	requestAnimFrame( update );
	
	console.log(level);
	map = new Map(level);
	console.log("map loaded");
	player = new Player(300,300);
	console.log("player loaded");
	
	healthMeter = new PIXI.Text(player.health);
	healthMeter.anchor.x = 0.5;
	healthMeter.position.x = 50;
	healthMeter.position.y = 50;
	stage.addChild(healthMeter);
	
	inMenu = false;
}

//called every frame
function update(){
	requestAnimFrame( update );
	
	if(!inMenu){
		if(youLost()){
			inMenu = true;
			loseScreen();
		}
		if(youWon()){
			inMenu = true;
			winScreen();
		}
		
		player.update(space);
		map.update(up, down, left, right);
		space = false;
		healthMeter.setText(player.health);
		
	} else {
		//in menu
	}
	renderer.render(stage);
	//console.log("update");
	
	
}

function youWon(){
	if(map.enemiesToKill < 1) {
		console.log("you win");
		return true;	
	}
	return false;
}

function youLost(){
	return (player.health < 1);
}

function resetGame(){
	map.removeMap();
	map = new Map(level);
	player = new Player();
	console.log("resetGame");
	inMenu = false;
}

function loseScreen(){
	var resetButton = new PIXI.Sprite(PIXI.Texture.fromImage("images/oldMan.png"));
	resetButton.position.x = 30;
	resetButton.position.y = 30;
	resetButton.interactive = true;
	stage.addChild(resetButton);
	
	resetButton.mousedown = function(data){
		stage.removeChild(resetButton);
		resetGame();
	};
}

function winScreen(){
	var resetButton = new PIXI.Sprite(PIXI.Texture.fromImage("images/oldMan.png"));
	resetButton.position.x = 30;
	resetButton.position.y = 30;
	resetButton.interactive = true;
	stage.addChild(resetButton);
	
	resetButton.mousedown = function(data){
		stage.removeChild(resetButton);
		if(level == numOfLvls){
			winGame();
		}else{
			level += 1;
			resetGame();
		}
	};
}

function winGame(){
	console.log("winGame");
};

window.addEventListener('keydown', function(event) {
  	if(event.keyCode == 37) {
      left = true;
      //console.log("lefty");
    }
    
	if(event.keyCode == 38) {
      up = true;
      //console.log("up");
    }

    if(event.keyCode == 39) {
      right = true;
      //console.log("right");
    }

    if(event.keyCode == 40) {
      down = true;
      //console.log("down");
    } 
}, false);

window.addEventListener('keyup', function(event) {
  	if(event.keyCode == 37) {
      left = false;
      //console.log("left");
    }
    
	if(event.keyCode == 38) {
      up = false;
      //console.log("up");
    }

    if(event.keyCode == 39) {
      right = false;
      //console.log("right");
    }

    if(event.keyCode == 40) {
      down = false;
      //console.log("down");
    }
    
    if(event.keyCode == 32){
    	space = true;
    	//console.log("space");
    }
}, false);
