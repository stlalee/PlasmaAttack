/**
 * @author Max Kerscher-Santelli
 */

var stage;
var renderer;

var map;
var player;
var enemy;

var healthMeter;
//var params = {font:"bold 4px Arial", fill: "#444444"};

var left = false;
var right = false;
var up = false;
var down = false;
var space = false;

//first function called
function initGame(){
	stage = new PIXI.Stage(0xFFFFFF);
	renderer = new PIXI.WebGLRenderer(700, 700);//autoDetectRenderer(400, 300);
	document.body.appendChild(renderer.view);
	requestAnimFrame( update );
	
	map = new Map(levelChoice(1));
	player = new Player();
	enemy = new Enemy(400,400);
	map.agents.push(enemy);
	
	healthMeter = new PIXI.Text(player.health);
	
	healthMeter.anchor.x = 0.5;
	healthMeter.position.x = 50;
	healthMeter.position.y = 50;
	stage.addChild(healthMeter);
}

//called every frame
function update(){
	requestAnimFrame( update );
	player.update(space);
	map.update(up, down, left, right);
	space = false;
	healthMeter.setText(player.health);
	renderer.render(stage);
	//console.log("update");
	
	/*if(gameOver()){
		newGame();
	}*/
}

function newGame(){
	
}

function gameOver(){
	console.log("game over");
	return false;
}

window.addEventListener('keydown', function(event) {
  	if(event.keyCode == 37) {
      left = true;
      console.log("lefty");
    }
    
	if(event.keyCode == 38) {
      up = true;
      console.log("up");
    }

    if(event.keyCode == 39) {
      right = true;
      console.log("right");
    }

    if(event.keyCode == 40) {
      down = true;
      console.log("down");
    } 
}, false);

window.addEventListener('keyup', function(event) {
  	if(event.keyCode == 37) {
      left = false;
      console.log("left");
    }
    
	if(event.keyCode == 38) {
      up = false;
      console.log("up");
    }

    if(event.keyCode == 39) {
      right = false;
      console.log("right");
    }

    if(event.keyCode == 40) {
      down = false;
      console.log("down");
    }
    
    if(event.keyCode == 32){
    	space = true;
    	console.log("space");
    }
}, false);

function levelChoice(x){
	var map = [];
	if(x == 1){
		for(var i = 0; i < 15; i++){
			map.push([]);
			for(var j = 0; j < 15; j++){
				map[i][j] = 0;
			}
		}
		for(var i = 0; i < 15; i++){
			map[0][i] = 1;
			map[14][i] = 1;
			map[i][0] = 1;
			map[i][14] = 1;
		}
		map[10][1] = 1;
		map[10][2] = 1;
		map[10][5] = 1;
		map[10][6] = 1;
		map[11][6] = 1;
		map[12][6] = 1;
		map[13][6] = 1;
		
	}
	
	return map;
}
