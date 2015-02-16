/**
 * @author Max Kerscher-Santelli
 */

var stage;
var renderer;

var map;

var left = false;
var right = false;
var up = false;
var down = false;

//var test;

function initGame(){
	// create an new instance of a pixi stage
	stage = new PIXI.Stage(0xFFFFFF);

	// create a renderer instance
	renderer = new PIXI.WebGLRenderer(700, 700);//autoDetectRenderer(400, 300);

	// add the renderer view element to the DOM
	document.body.appendChild(renderer.view);

	requestAnimFrame( update );

	map = new Map(20,20);
	
	//test = new PIXI.Sprite(PIXI.Texture.fromImage("OldWoman.png"));
	//Object.defineProperty(test, 'testValue', {value: "testjahsdflkjhasdflkjashdflkjashdflkajsdhflkasjdhfslakdjfh"});
	
}

function update(){
	requestAnimFrame( update );
	map.update(up, down, left, right);
	renderer.render(stage);
	//console.log("update");
	//console.log(test.testValue);
	
	
	if(gameOver()){
		newGame();
	}
}

function newGame(){
	
}

function gameOver(){
	return false;
}

window.addEventListener('keydown', function(event) {
  	if(event.keyCode == 37) {
      left = true;
      console.log("left");
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
}, false);
