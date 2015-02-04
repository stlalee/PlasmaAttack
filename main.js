/**
 * @author Max Kerscher-Santelli
 */
var bunny;
var stage;
var renderer;

function initGame(){
	// create an new instance of a pixi stage
	stage = new PIXI.Stage(0xFFFFFF);

	// create a renderer instance
	renderer = new PIXI.WebGLRenderer(400, 300);//autoDetectRenderer(400, 300);

	// add the renderer view element to the DOM
	document.body.appendChild(renderer.view);

	requestAnimFrame( update );

	// create a texture from an image path
	var texture = PIXI.Texture.fromImage("images/Ultramarineblue.jpg");
	// create a new Sprite using the texture
	bunny = new PIXI.Sprite(texture);

	// center the sprites anchor point
	bunny.anchor.x = 0.5;
	bunny.anchor.y = 0.5;

	// move the sprite t the center of the screen
	bunny.position.x = 200;
	bunny.position.y = 150;

	stage.addChild(bunny);
}

function update(){
	requestAnimFrame( update );

	// just for fun, lets rotate mr rabbit a little
	bunny.rotation += 0.1;

	// render the stage
	renderer.render(stage);
	console.log("update");
	
	if(gameOver()){
		newGame();
	}
}

function newGame(){
	
}

function gameOver(){
	return false;
}
