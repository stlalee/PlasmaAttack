/**
 * @author Connor McNeill
 */

var Enemy = function(x, y){
	this.interval;
	this.attackDelay = 2000; //in milliseconds
	this.attackedLast = 0;
	this.sp = new PIXI.Sprite(PIXI.Texture.fromImage("images/circle.png"));
	this.sp.position.x = x;
	this.sp.position.y = y;
	stage.addChild(this.sp);
};
/*
Map.prototype.Enemy = function(){
	console.log("enemy test");
};
*/
/*
Enemy.update = function(time){
	this.attackedLast += time;
};*/

Enemy.attack = function(){
	//animation?
	if(this.attackDelay - this.attackedLast < 0){
		//we're not spamming
		this.attackedLast = 0;
		
	}
};
