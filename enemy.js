/**
 * @author Connor McNeill
 */
var enemySpeed = 1;
var enemyEngage = 200;
var enemyDamageTaken = 1;

var Enemy = function(x, y){
	this.ally = false;
	this.resting = false;
	this.attackDelay = 1000; //in milliseconds
	this.attackedLast = 0;
	this.interval;
	this.health = 100;
	this.sp = new PIXI.Sprite(PIXI.Texture.fromImage("images/characters/PNGs/Player.png"));
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

Enemy.prototype.update = function(){
	var source = player;
	var angle;
	var up;
	var left;
	var dist;
	
	for(var i = 0; i < map.allies.length; i++){
		dist = distance(map.allies[i].sp.position, this.sp.position);
		if(dist < enemyEngage){
			if(distance(source.sp.position, this.sp.position) > dist){
				source = map.allies[i];
			}
		}
	}

	angle = getPlayerAngle(source, this);
	up = getY(angle);
	left = getX(angle);
	for(var i = 0; i < map.mapA.length; i++){
		for(var j = 0; j < map.mapA[i].length; j++){
			if(map.mapA[i][j].isWall && distance(map.mapA[i][j].position, this.sp.position) > (spriteWidth/2)){
				if(map.mapA[i][j].position.x >= (this.sp.position.x + (spriteWidth/2)) && left > 0 && scCollide(map.mapA[i][j], this.sp)){
					left = 0;
				}else if(map.mapA[i][j].position.x < (this.sp.position.x - (spriteWidth/2)) && left < 0 && scCollide(map.mapA[i][j], this.sp)){
					left = 0;
				}
				if(map.mapA[i][j].position.y >= (this.sp.position.y + (spriteWidth/2)) && up > 0 && scCollide(map.mapA[i][j], this.sp)){
					up = 0;
				}else if(map.mapA[i][j].position.y < (this.sp.position.y - (spriteWidth/2)) && up < 0 && scCollide(map.mapA[i][j], this.sp)){
					up = 0;
				}
			}
		}
	}
	for(var i = 0; i < map.agents.length; i++){
		if(distance(map.agents[i].sp, this.sp) < spriteWidth && cCollide(map.agents[i].sp, this.sp)){
			if(map.agents[i].sp.position.x >= (this.sp.position.x + (spriteWidth/2)) && left > 0){
				left = 0;
			}else if(map.agents[i].sp.position.x < (this.sp.position.x - (spriteWidth/2)) && left < 0){
				left = 0;
			}
			if(map.agents[i].sp.position.y >= (this.sp.position.y + (spriteWidth/2)) && up > 0){
				up = 0;
			}else if(map.agents[i].sp.position.y < (this.sp.position.y - (spriteWidth/2)) && up < 0){
				up = 0;
			}
		}
	}
	for(var i = 0; i < map.allies.length; i++){
		if(distance(map.allies[i].sp, this.sp) < spriteWidth && cCollide(map.allies[i].sp, this.sp)){
			if(map.allies[i].sp.position.x >= (this.sp.position.x + (spriteWidth/2)) && left > 0){
				left = 0;
			}else if(map.allies[i].sp.position.x < (this.sp.position.x - (spriteWidth/2)) && left < 0){
				left = 0;
			}
			if(map.allies[i].sp.position.y >= (this.sp.position.y + (spriteWidth/2)) && up > 0){
				up = 0;
			}else if(map.allies[i].sp.position.y < (this.sp.position.y - (spriteWidth/2)) && up < 0){
				up = 0;
			}
		}
	}
	if(distance(player.sp, this.sp) < spriteWidth && cCollide(player.sp, this.sp)){
		if(player.sp.position.x >= (this.sp.position.x + (spriteWidth/2)) && left > 0){
			left = 0;
		}else if(player.sp.position.x < (this.sp.position.x - (spriteWidth/2)) && left < 0){
			left = 0;
		}
		if(player.sp.position.y >= (this.sp.position.y + (spriteWidth/2)) && up > 0){
			up = 0;
		}else if(player.sp.position.y < (this.sp.position.y - (spriteWidth/2)) && up < 0){
			up = 0;
		}
	}
	this.sp.position.x += left;
	this.sp.position.y += up;
};

function getPlayerAngle(source, enemy){
	var dx = source.sp.position.x - enemy.sp.position.x;
	var dy = source.sp.position.y - enemy.sp.position.y;
	return(Math.atan2(dy, dx));
}

function getY(angle){
	return(Math.sin(angle)*enemySpeed);
}

function getX(angle){
	return(Math.cos(angle)*enemySpeed);
}

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
	if(!path) { this.currentPath = []; return;}
	this.currentPath = path;
};
