/**
 * @author Connor McNeill
 */


var Player = function(){
	this.sp = new PIXI.Sprite(PIXI.Texture.fromImage("images/circle.png"));
	this.sp.position.x = 315;
	this.sp.position.y = 315;
	stage.addChild(this.sp);
};

Map.prototype.Player = function(){
	console.log("player test");
};