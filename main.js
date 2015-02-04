/**
 * @author Max Kerscher-Santelli
 */
function initGame(){
	// create an new instance of a pixi stage
	var stage = new PIXI.Stage(0xFFFFFF);

	// create a renderer instance
	var renderer = new PIXI.WebGLRenderer(400, 300);//autoDetectRenderer(400, 300);

	// add the renderer view element to the DOM
	document.body.appendChild(renderer.view);

	requestAnimFrame( animate );

	// create a texture from an image path
	var texture = PIXI.Texture.fromImage("images/Ultramarineblue.jpg");
	// create a new Sprite using the texture
	var bunny = new PIXI.Sprite(texture);

	// center the sprites anchor point
	bunny.anchor.x = 0.5;
	bunny.anchor.y = 0.5;

	// move the sprite t the center of the screen
	bunny.position.x = 200;
	bunny.position.y = 150;

	stage.addChild(bunny);

	function animate() {

	    requestAnimFrame( animate );

	    // just for fun, lets rotate mr rabbit a little
	    bunny.rotation += 0.1;

	    // render the stage
	    renderer.render(stage);
	}
}

function update(){
	
}

function newGame(){
	
}
