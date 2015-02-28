/**
 * @author Connor McNeill
 * 
 * in the future we should merge enemy and ally into a single object, 
 * or at least have them both inherit shared properties from an ancestor
 */

var Ally = function(x,y){
	this.ally = true;
	this.resting = false;
	this.attackDelay = 1000; //in milliseconds
	this.attackedLast = 0;
	this.interval;
	this.health = 10;
	this.sp = new PIXI.Sprite(PIXI.Texture.fromImage("images/circle.png"));
	this.sp.position.x = x;
	this.sp.position.y = y;
	this.currentPath = null;
	stage.addChild(this.sp);
};

Ally.prototype.rest = function(){
	var self = this;
	this.resting = true;
	console.log("wait for " + this.attackDelay);
	function fire(){
		console.log("fired");
		self.resting = false;
	}
	setTimeout(fire, this.attackDelay);
};

