/**
 * @author Connor McNeill
 */


var Player = function(){
	this.sp = new PIXI.Sprite(PIXI.Texture.fromImage("images/kenta.png"));
	this.sp.position.x = 315;
	this.sp.position.y = 315;
	this.health = 100;
	this.facing = "right";
	stage.addChild(this.sp);
};

Map.prototype.Player = function(){
	console.log("player test");
};

Player.prototype.shootPlasma = function(){
	
	this.health -= 10;
	if(this.health <= 0) gameOver();
	
};


Player.prototype.takeHit = function(x){
	this.health -= x;
	console.log(this.health);
};
