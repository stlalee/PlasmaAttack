/**
 * @author Connor McNeill
 */

var Enemy = function(x, y){
	this.resting = false;
	this.attackDelay = 1000; //in milliseconds
	this.attackedLast = 0;
	this.interval;
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

Enemy.prototype.rest = function(){
	var self = this;
	this.resting = true;
	console.log("wait for " + this.attackDelay);
	function fire(){
		console.log("fired");
		self.resting = false;
	}
	setTimeout(fire, this.attackDelay);
};

Enemy.attack = function(){
	//animation?
	if(this.attackDelay - this.attackedLast < 0){
		//we're not spamming
		this.attackedLast = 0;
		
	}
};
