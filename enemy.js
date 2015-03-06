/**
 * @author Connor McNeill
 */

var Enemy = function(x, y){
	this.ally = false;
	this.resting = false;
	this.attackDelay = 1000; //in milliseconds
	this.attackedLast = 0;
	this.interval;
	this.health = 10;
	this.sp = new PIXI.Sprite(PIXI.Texture.fromImage("images/oldMan.png"));
	this.sp.position.x = x;
	this.sp.position.y = y;
	this.currentPath = [];
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

Enemy.prototype.takeHit = function(x){
	this.health -= x;
	if (this.health < 1){
		stage.removeChild(this.sp);
		
	}
};

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

Enemy.prototype.followPath = function(path){
	//path should be a list of nodes
	
	this.currentPath = path;
	if(path.length > 0){
		console.log("real path!");
	}
};
