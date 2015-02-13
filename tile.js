/**
 * @author Max Kerscher-Santelli
 */

var Tile = function(x, y){
	console.log("new tile created");
	console.log(x);
	console.log(y);
	this.sp = new PIXI.Sprite(PIXI.Texture.fromImage("images/Untitled-1.jpg"));
	sp.x = x;
	sp.y = y;
	stage.addChild(sp);
};

Tile.prototype.test = function(){
	console.log("Tile.test");
};