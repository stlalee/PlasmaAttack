/**
 * @author Connor McNeill
 */

var projectileSpeed = 14;
var projectileLife = 30;
var costToShoot = 10;

var Player = function(){
	this.sp = new PIXI.Sprite(PIXI.Texture.fromImage("images/circle.png"));
	this.sp.position.x = 315;
	this.sp.position.y = 315;
	this.health = 100;
	this.projectiles = [];
	this.facing = "right";
	stage.addChild(this.sp);
};

Map.prototype.Player = function(){
	console.log("player test");
};

Player.prototype.shootPlasma = function(){
	if(this.health > costToShoot){
		var temp = new PIXI.Sprite(PIXI.Texture.fromImage("images/plasma.png"));
		Object.defineProperty(temp, 'direction', {value: this.facing});
		Object.defineProperty(temp, 'time', {value: projectileLife, writable: true});
		temp.position.x = this.sp.position.x;
		temp.position.y = this.sp.position.y;
		stage.addChild(temp);
		this.projectiles.push(temp);
		this.health -= costToShoot;
	}
	
};

Player.prototype.update = function(space){
	if(space){
		this.shootPlasma();
	}
	for(var i = 0; i < this.projectiles.length; i++){
		if(!(canWalkHere(map.mapA, getTile(this.projectiles[i].position.x, this.projectiles[i].position.y)[0], 
									getTile(this.projectiles[i].position.x, this.projectiles[i].position.y)[1]))){
			stage.removeChild(this.projectiles[i]);
			this.projectiles.splice(i,1);
			console.log("collided");
			continue;
		}
		if(this.projectiles[i].time == 0){
			stage.removeChild(this.projectiles[i]);
			this.projectiles.splice(i,1);
			console.log("out of time");
			continue;
		}else{
			this.projectiles[i].time = this.projectiles[i].time - 1;
			//console.log(this.projectiles[i].time);
		}
		if(this.projectiles[i].direction == "up"){
			this.projectiles[i].position.y -= projectileSpeed;
		}else if(this.projectiles[i].direction == "down"){
			this.projectiles[i].position.y += projectileSpeed;
		}else if(this.projectiles[i].direction == "left"){
			this.projectiles[i].position.x -= projectileSpeed;
		}else{
			this.projectiles[i].position.x += projectileSpeed;
		}
	}
};


Player.prototype.takeHit = function(x){
	this.health -= x;
	//console.log(this.health);
};

Player.prototype.gainHealth = function(x){
	this.health += x;
	//console.log(this.health);
};
