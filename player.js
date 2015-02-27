/**
 * @author Connor McNeill
 */


var Player = function(){
	this.sp = new PIXI.Sprite(PIXI.Texture.fromImage("images/circle.png"));
	this.sp.position.x = 315;
	this.sp.position.y = 315;
	this.health = 100;
	stage.addChild(this.sp);
};

Map.prototype.Player = function(){
	console.log("player test");
};

Player.shootPlasma = function(){
	
	this.health -= 10;
	
	if(this.health <= 0) gameOver();
};


Player.prototype.takeHit = function(x){
	this.health -= x;
	console.log(this.health);
};
