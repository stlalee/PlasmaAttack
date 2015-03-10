/**
 * @author Connor McNeill
 * 
 * in the future we should merge enemy and ally into a single object, 
 * or at least have them both inherit shared properties from an ancestor
 */

var allyDamageTaken = 1;
var allyEngage = 200;

var Ally = function(x,y){
	this.ally = true;
	this.resting = false;
	this.attackDelay = 1000; //in milliseconds
	this.attackedLast = 0;
	this.interval;
	this.health = 100;
	this.sp = new PIXI.Sprite(PIXI.Texture.fromImage("images/circle.png"));
	this.sp.position.x = x;
	this.sp.position.y = y;
	this.currentPath = null;
	stage.addChild(this.sp);
};

Ally.prototype.update = function(){
	var source;
	var angle;
	var up;
	var left;
	var dist;
	
	for(var i = 0; i < map.agents.length; i++){
		dist = distance(map.agents[i].sp.position, this.sp.position);
		if(dist < allyEngage){
			if(source == null){
				source = map.agents[i];
			}else if(distance(source.sp.position, this.sp.position) > dist){
				source = map.agents[i];
			}
		}
	}
	if(source == null){
		source = player;
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
			if(map.agents[i].sp.position.x >= (this.sp.position.x + (spriteWidth/2)) && left > 0){
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
		console.log("poop");
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

Ally.prototype.takeHit = function(x){
	this.health -= x;
	if (this.health < 1){
		stage.removeChild(this.sp);
		
	}
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

