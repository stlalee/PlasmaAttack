/**
 * @author Max Kerscher-Santelli
 */

var spriteWidth = 75;
var pLocation;
var playerSpeed = 10;
var healthPackValue = 25;
//var agents;

//creates new map based on level given
var Map = function(level){
	if(level == 1){
		this.agents = [];
		this.allies = [];
		this.mapA = [];
		this.items = [];
		this.spawners = [];
		this.enemiesToKill = 5;
		this.enemiesToSpawn = 5;
		this.maxEnemies = 2;
		
		var map1 = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,1,1,1,1,1,0,1,1,0,1,1,1,1,0],
					[0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
					[0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
					[0,1,1,1,1,1,0,1,1,0,1,1,1,1,0],
					[0,1,1,1,1,1,0,1,1,0,1,1,1,1,0],
					[0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
					[0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
					[0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
					[0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
					[0,1,1,1,1,1,1,1,1,0,1,1,1,1,0],
					[0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
					[0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
					[0,1,1,1,1,1,1,1,1,0,1,1,1,1,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
					
		for(var i=0; i<map1.length; i++){
			//this.mapA.push([]);
			this.mapA[i] = [];
			for(j=0; j<map1[i].length; j++){
				if(map1[i][j] == 0){
					//wall
					var sp = new PIXI.Sprite(PIXI.Texture.fromImage("images/assets/ground tile.png"));
					this.mapA[i][j] = sp;
					Object.defineProperty(this.mapA[i][j], 'isWall', {value: true});
				} else {
					var sp = new PIXI.Sprite(PIXI.Texture.fromImage("images/assets/ground.png"));
					this.mapA[i][j] = sp;
					Object.defineProperty(this.mapA[i][j], 'isWall', {value: false});
				}
			}
		}
		/*			
		for(var i = 0; i < 15; i++){
			this.mapA.push([]);
			for(var j = 0; j < 15; j++){
				this.mapA[i].push(new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/purple/purple mid.png")));
				Object.defineProperty(this.mapA[i][j], 'isWall', {value: false});
			}
		}
		for(var i = 0; i < 15; i++){
			this.mapA[0][i] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
			Object.defineProperty(this.mapA[0][i], 'isWall', {value: true});
			
			this.mapA[14][i] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
			Object.defineProperty(this.mapA[14][i], 'isWall', {value: true});
			
			this.mapA[i][0] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
			Object.defineProperty(this.mapA[i][0], 'isWall', {value: true});
			
			this.mapA[i][14] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
			Object.defineProperty(this.mapA[i][14], 'isWall', {value: true});
		}
		//top right room
		this.mapA[8][1] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[8][1], 'isWall', {value: true});
		//mapA[10][2] = 1;
		this.mapA[8][2] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[8][2], 'isWall', {value: true});
		//mapA[10][5] = 1;
		this.mapA[8][5] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[8][5], 'isWall', {value: true});
		//mapA[10][6] = 1;
		this.mapA[8][6] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[8][6], 'isWall', {value: true});
		//mapA[11][6] = 1;
		this.mapA[9][6] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[9][6], 'isWall', {value: true});
		//mapA[12][6] = 1;
		this.mapA[10][6] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[10][6], 'isWall', {value: true});
		//map[13][6] = 1;
		this.mapA[11][6] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[11][6], 'isWall', {value: true});
		this.mapA[12][6] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[12][6], 'isWall', {value: true});
		this.mapA[13][6] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[13][6], 'isWall', {value: true});
		
		//bottom right
		this.mapA[13][9] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[13][9], 'isWall', {value: true});
		//mapA[10][2] = 1;
		this.mapA[12][9] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[12][9], 'isWall', {value: true});
		//mapA[10][2] = 1;
		this.mapA[11][9] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[11][9], 'isWall', {value: true});
		//mapA[10][2] = 1;
		this.mapA[10][9] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[10][9], 'isWall', {value: true});
		//mapA[10][2] = 1;
		this.mapA[9][9] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[9][9], 'isWall', {value: true});
		//mapA[10][2] = 1;
		this.mapA[6][9] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[6][9], 'isWall', {value: true});
		//mapA[10][2] = 1;
		this.mapA[6][10] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[6][10], 'isWall', {value: true});
		//mapA[10][2] = 1;
		this.mapA[6][11] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[6][11], 'isWall', {value: true});
		//mapA[10][2] = 1;
		this.mapA[6][12] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[6][12], 'isWall', {value: true});
		//mapA[10][2] = 1;
		this.mapA[6][13] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[6][13], 'isWall', {value: true});
		
		//top left
		this.mapA[5][1] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[5][1], 'isWall', {value: true});
		//mapA[10][2] = 1;
		this.mapA[5][2] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[5][2], 'isWall', {value: true});
		//mapA[10][5] = 1;
		this.mapA[5][5] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[5][5], 'isWall', {value: true});
		//mapA[10][6] = 1;
		this.mapA[5][6] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[5][6], 'isWall', {value: true});
		//mapA[11][6] = 1;
		this.mapA[4][6] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[4][6], 'isWall', {value: true});
		//mapA[12][6] = 1;
		this.mapA[3][6] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[3][6], 'isWall', {value: true});
		//map[13][6] = 1;
		this.mapA[2][6] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[2][6], 'isWall', {value: true});
		this.mapA[1][6] = new PIXI.Sprite(PIXI.Texture.fromImage("images/first level tiles/yellow/yellow mid.png"));
		Object.defineProperty(this.mapA[1][6], 'isWall', {value: true});
		*/
		//map[2][2] = 0;
		this.mapA[12][12] = new PIXI.Sprite(PIXI.Texture.fromImage("images/assets/wooden tile copy.png"));
		Object.defineProperty(this.mapA[12][12], 'isWall', {value: false});
		this.spawners.push(this.mapA[12][12]);
		//map[2][12] = 0;
		this.mapA[2][12] = new PIXI.Sprite(PIXI.Texture.fromImage("images/assets/wooden tile copy.png"));
		Object.defineProperty(this.mapA[2][12], 'isWall', {value: false});
		this.spawners.push(this.mapA[2][12]);
		//map[2][12] = 0;
		this.mapA[12][3] = new PIXI.Sprite(PIXI.Texture.fromImage("images/assets/wooden tile copy.png"));
		Object.defineProperty(this.mapA[12][3], 'isWall', {value: false});
		this.spawners.push(this.mapA[12][3]);
		
		for(var i = 0; i < 15; i++){
			for(var j = 0; j < 15; j++){
				this.mapA[i][j].position.x = i * spriteWidth;
				this.mapA[i][j].position.y = j * spriteWidth;
				stage.addChild(this.mapA[i][j]);
				if((i * spriteWidth) <= (renderer.width/2) && (i * spriteWidth) >= ((renderer.width/2) - spriteWidth) 
											&& (j * spriteWidth) <= (renderer.height/2) && (j * spriteWidth) >= ((renderer.height/2) - spriteWidth)){
					pLocation = {x: i, y: j};
				}
			}
		}
		
		this.items.push(new PIXI.Sprite(PIXI.Texture.fromImage("images/health pack.png")));
		this.items[0].position.x = 200;
		this.items[0].position.y = 400;
		stage.addChild(this.items[0]);
	}else if(level == 2){
		this.agents = [];
		this.allies = [];
		this.mapA = [];
		this.items = [];
		this.spawners = [];
		this.enemiesToKill = 10;
		this.enemiesToSpawn = 10;
		this.maxEnemies = 2;
		
		for(var i = 0; i < 10; i++){
			this.mapA.push([]);
			for(var j = 0; j < 10; j++){
				this.mapA[i].push(new PIXI.Sprite(PIXI.Texture.fromImage("images/assets/ground.png")));
				Object.defineProperty(this.mapA[i][j], 'isWall', {value: false});
			}
		}
		
		for(var i = 0; i < 10; i++){
			this.mapA[0][i] = new PIXI.Sprite(PIXI.Texture.fromImage("images/Untitled-1.jpg"));
			Object.defineProperty(this.mapA[0][i], 'isWall', {value: true});
			
			this.mapA[9][i] = new PIXI.Sprite(PIXI.Texture.fromImage("images/Untitled-1.jpg"));
			Object.defineProperty(this.mapA[9][i], 'isWall', {value: true});
			
			this.mapA[i][0] = new PIXI.Sprite(PIXI.Texture.fromImage("images/Untitled-1.jpg"));
			Object.defineProperty(this.mapA[i][0], 'isWall', {value: true});
			
			this.mapA[i][9] = new PIXI.Sprite(PIXI.Texture.fromImage("images/Untitled-1.jpg"));
			Object.defineProperty(this.mapA[i][9], 'isWall', {value: true});
		}
		
		for(var i = 0; i < 10; i++){
			for(var j = 0; j < 10; j++){
				this.mapA[i][j].position.x = i * spriteWidth;
				this.mapA[i][j].position.y = j * spriteWidth;
				stage.addChild(this.mapA[i][j]);
				if((i * spriteWidth) <= (renderer.width/2) && (i * spriteWidth) >= ((renderer.width/2) - spriteWidth) 
											&& (j * spriteWidth) <= (renderer.height/2) && (j * spriteWidth) >= ((renderer.height/2) - spriteWidth)){
					pLocation = {x: i, y: j};
				}
			}
		}
	}
	console.log(this.mapA);
};

Map.prototype.removeMap = function(){
	for(var i = 0; i < this.items.length; i++){
		stage.removeChild(this.items[i]);
	}
	for(var i = 0; i < this.agents.length; i++){
		stage.removeChild(this.agents[i]);
	}
	for(var i = 0; i < this.allies.length; i++){
		stage.removeChild(this.allies[i].sp);
	}
	for(var i = 0; i < this.mapA.length; i++){
		for(var j = 0; j < this.mapA[i].length; j++){
			stage.removeChild(this.mapA[i][j]);
		}
	}
	console.log("remove map");
};

Map.prototype.test = function(){
	console.log("map.test");
};

//runs everytime we call update
Map.prototype.update = function(up, down, left, right){
	
	//check up and down for collision
	for(var i = pLocation.x - 1; i <= pLocation.x + 1; i++){
		if(this.mapA[i][pLocation.y - 1].isWall && scCollide(this.mapA[i][pLocation.y - 1], player.sp)){
			up = false;
		}
		if(this.mapA[i][pLocation.y + 1].isWall && scCollide(this.mapA[i][pLocation.y + 1], player.sp)){
			down = false;
		}
	}
	
	//checks left and right for collision
	for(var i = pLocation.y - 1; i <= pLocation.y + 1; i++){
		if(this.mapA[pLocation.x - 1][i].isWall && scCollide(this.mapA[pLocation.x - 1][i], player.sp)){
			//console.log("left");
			left = false;
		}
		if(this.mapA[pLocation.x + 1][i].isWall && scCollide(this.mapA[pLocation.x + 1][i], player.sp)){
			right = false;
		}
	}
	
	//moves tiles
	for(i = 0; i < this.mapA.length; i++){
		for(j = 0; j < this.mapA[i].length; j++){
			//moveObject(this.mapA, this.mapA[i][j].position, playerSpeed, down, up, right, left);
			if(up){
				player.facing = "up";
				this.mapA[i][j].position.y += playerSpeed;
			}
			if(down){
				player.facing = "down";
				this.mapA[i][j].position.y -= playerSpeed;
			}
			if(right){
				player.facing = "right";
				this.mapA[i][j].position.x -= playerSpeed;
			}
			if(left){
				player.facing = "left";
				this.mapA[i][j].position.x += playerSpeed;
			}
			
			//stops offscreen tiles from being drawn
			if(this.mapA[i][j].position.x < - spriteWidth || this.mapA[i][j].position.x > 700 || 
											this.mapA[i][j].position.y < - spriteWidth || this.mapA[i][j].position.y > 700){
				this.mapA[i][j].visible = false;
			}else{
				this.mapA[i][j].visible = true;
			}
			
			//updates player location
			if(this.mapA[i][j].position.x <= (renderer.width/2) && this.mapA[i][j].position.x > ((renderer.width/2) - spriteWidth) 
							&& this.mapA[i][j].position.y <= (renderer.height/2) && this.mapA[i][j].position.y > ((renderer.height/2) - spriteWidth)){
				pLocation = {x: i, y: j};
				//this.mapA[i][j].visible = false;
			}
		}
	}
	
	//spawn enemies
	for(var i = 0; i < this.spawners.length; i++){
		if(/*distance(player.sp.position, this.spawners[i].position) > 250 &&*/ this.agents.length < this.maxEnemies && this.enemiesToSpawn > 0){
			this.agents.push(new Enemy(this.spawners[i].position.x, this.spawners[i].position.y));
			this.enemiesToSpawn -= 1;
			//console.log(this.enemiesToSpawn);
		}
	}
	
	//move allies
	for(var i = 0; i < this.allies.length; i++){
		//moveObject(this.mapA, this.allies[i].sp.position, playerSpeed, down, up, right, left);
		if(up){
			this.allies[i].sp.position.y += playerSpeed;
		}
		if(down){
			this.allies[i].sp.position.y -= playerSpeed;
		}
		if(right){
			this.allies[i].sp.position.x -= playerSpeed;
		}
		if(left){
			this.allies[i].sp.position.x += playerSpeed;
		}
		//stops offscreen allies from being drawn
		if(this.allies[i].sp.position.x < - spriteWidth || this.allies[i].sp.position.x > 700 || 
									 	this.allies[i].sp.position.y < -spriteWidth || this.allies[i].sp.position.y > 700){
			this.allies[i].sp.visible = false;
		}else{
			this.allies[i].sp.visible = true;
		}
	}
	
	//moves agents with(in) the map (currently just enemies, but in the future might also be allies?)
	for(i = 0; i < this.agents.length; i++){
		//move agents with the tiles
		//moveObject(this.mapA, this.agents[i].sp.position, playerSpeed, down, up, right, left);
		if(up){
			this.agents[i].sp.position.y += playerSpeed;
		} else if(down){
			this.agents[i].sp.position.y -= playerSpeed;
		}
		if(right){
			this.agents[i].sp.position.x -= playerSpeed;
		} else if(left){
			this.agents[i].sp.position.x += playerSpeed;
		}
		
		//stops offscreen enemies from being drawn
		if(this.agents[i].sp.position.x < - spriteWidth 
			|| this.agents[i].sp.position.x > 700 
			|| this.agents[i].sp.position.y < -spriteWidth 
			|| this.agents[i].sp.position.y > 700){
			this.agents[i].sp.visible = false;
		}
		else {
			this.agents[i].sp.visible = true;
		}
		
		//player is in enemy sight/earshot/whatever
		if(distance(player.sp.position, this.agents[i].sp.position) < 700){
			//does the enemy already have a path?
			var blah = new Graph(this.mapA, {diagonal: true});
			//console.log(blah);
			if(this.agents[i].currentPath.length == 0){
				//no, so give it one
				updatePath(this.mapA, player, this.agents[i], blah);
			} else {
				//agent has a path, try to follow it
				console.log(this.agents[i].currentPath);
				var pth = this.agents[i].currentPath;
				//path is not updated enough
				if(distance(pth[pth.length-1], getTile(this.mapA, player.sp.position.x, player.sp.position.y)) > spriteWidth/2
				   || !inBounds(this.mapA, pth[0].x, pth[0].y)){
					console.log("path outdated");
					updatePath(this.mapA, player, this.agents[i], blah);
				}
				
				
				var nextX = this.agents[i].currentPath[0].x * spriteWidth;
				var nextY = this.agents[i].currentPath[0].y * spriteWidth;
				var nextPoint = new Object();
				nextPoint.x = nextX + spriteWidth/2;
				nextPoint.y = nextY + spriteWidth/2;
				var curPos = this.agents[i].sp.position;
				
				console.log(nextPoint, curPos, distance(nextPoint, curPos));
				/*if(!canWalkPos(this.mapA, nextPoint.x, nextPoint.y)){
					console.log("cant walk here (at nextPoint)", nextPoint, this.agents[i].currentPath[0]);
					this.agents[i].followPath([]);
					
				} */
				if (distance(nextPoint, curPos) < spriteWidth/2){
					//close enough
					console.log("removing ", nextPoint, this.agents[i].currentPath[0]);
					this.agents[i].currentPath.shift();
				} else {
					console.log("moving towards", nextPoint);
					
					moveObject(this.mapA, this.agents[i].sp.position, 
							1, 
							(nextPoint.y - curPos.y < 0), 
							(nextPoint.y - curPos.y > 0), 
							(nextPoint.x - curPos.x < 0), 
							(nextPoint.x - curPos.x > 0));
					
					
					
					/*
					if(nextPoint.x - curPos.x > 0){
						//right
						this.agents[i].sp.position.x += 3;
					} else if(nextPoint.x - curPos.x < 0){
						//left
						this.agents[i].sp.position.x -= 3;
					}
					if(nextPoint.y - curPos.y > 0){
						//down
						this.agents[i].sp.position.y += 3;
					} else if(nextPoint.y - curPos.y < 0){
						//up
						this.agents[i].sp.position.y -= 3;
					}*/
				}
				
			}
		} else {
			//player too far away
			this.agents[i].currentPath = [];
		}
	}
	console.log(this.agents);
	
	//naive collision check with enemies, take hit if colliding
	for(var i = 0; i < this.agents.length; i++){
		if(!this.agents[i].resting && cCollide(player.sp, this.agents[i].sp)){
			//I know this is dumb but it'll do for now
			player.takeHit(5);
			this.agents[i].rest();
		}
	}
	
	//check projectile collision with agents
	for(var i = 0; i < player.projectiles.length; i++){
		
		for(var j = 0; j < this.agents.length; j++){
			if(!this.agents.ally && cCollide(player.projectiles[i], this.agents[j].sp)){
				this.allies.push(new Ally(this.agents[j].sp.position.x,this.agents[j].sp.position.y));
				stage.addChild(this.allies[this.allies.length - 1].sp);
				this.agents[j].takeHit(10);
				this.agents.splice(j, 1);
				stage.removeChild(player.projectiles[i]);
				player.projectiles.splice(i,1);
				this.enemiesToKill -= 1;
				//console.log(this.enemiesToKill);
			}else{
				moveObject(this.mapA, player.projectiles[i].position, playerSpeed, down, up, right, left);
				/*if(left){
					player.projectiles[i].position.x += playerSpeed; 
				}
				if(right){
					player.projectiles[i].position.x -= playerSpeed;
				}
				if(up){
					player.projectiles[i].position.y += playerSpeed;
				}
				if(down){
					player.projectiles[i].position.y -= playerSpeed;
				}*/
			}
		}
	}

	//healthpack logic	
	for(var i = 0; i < this.items.length; i++){
		if(cCollide(this.items[i], player.sp)){
			stage.removeChild(this.items[i]);
			this.items.splice(i,1);
			player.gainHealth(healthPackValue);
			continue;
		}
		
		moveObject(this.mapA, this.items[i].position, playerSpeed, down, up, right, left);
		/*if(left){
			this.items[i].position.x += playerSpeed; 
		}
		if(right){
			this.items[i].position.x -= playerSpeed;
		}
		if(up){
			this.items[i].position.y += playerSpeed;
		}
		if(down){
			this.items[i].position.y -= playerSpeed;
		}*/
		//stops offscreen health pack from being drawn
		if(this.items[i].position.x < - spriteWidth || this.items[i].position.x > 700 || 
									 	this.items[i].position.y < -spriteWidth || this.items[i].position.y > 700){
			this.items[i].visible = false;
		}else{
			this.items[i].visible = true;
		}
	}
	
	//this.healthMeter.setText(player.health);
	//console.log("map update");
};

function distance(p1, p2){
	return Math.sqrt(Math.pow(p1.x - p2.x, 2)+Math.pow(p1.y - p2.y,2));
}

//takes 2 sprites, assuming their circles, and checks for collision
function cCollide(sp1, sp2){
	var d = sp1.width/2 + sp2.width/2;
	var dist = Math.sqrt(Math.pow((sp1.position.x - sp2.position.x),2) + Math.pow((sp1.position.y - sp2.position.y), 2));
	return(dist < d);
};

//takes two sprites, assumes one is a square and one is a circle and checks for collision
function scCollide(square, circle){
	var radius = circle.width/2;
	var midPoint = {x: circle.position.x + (radius), y: circle.position.y + (radius)};
	//console.log("start new col");
	
	//checks if circle overlaps top or bottom edge of square
	if(midPoint.x >= square.position.x && midPoint.x <= square.position.x + square.width){
		if(midPoint.y - (square.position.y + square.height) < radius && midPoint.y - (square.position.y + square.height) > 0){
			//console.log("line col top or bottom");
			return true;
		}
		if(square.position.y - midPoint.y < radius && square.position.y - midPoint.y > 0){
			//console.log("line col top or bottom");
			return true;
		}
	}
	
	//check is circle is overlaps sides of square
	if(midPoint.y >= square.position.y && midPoint.y <= square.position.y + square.height){
		if(midPoint.x - (square.position.x + square.width) < radius && midPoint.x - (square.position.x + square.width) > 0){
			//console.log("line col left or right");
			return true;
		}
		if(square.position.x - midPoint.x < radius && square.position.x - midPoint.x > 0){
			//console.log("line col left or right");
			return true;
		}
	}
	
	//checks if circle overlaps a corner
	if(Math.sqrt(Math.pow((square.position.x - midPoint.x),2) + Math.pow((square.position.y - midPoint.y), 2)) < radius -7){
		//console.log("point col");
		return true;
	}else if(Math.sqrt(Math.pow((square.position.x + square.width - midPoint.x),2) + Math.pow((square.position.y - midPoint.y), 2)) < radius -7){
		//console.log("point col");
		return true;
	}else if(Math.sqrt(Math.pow((square.position.x - midPoint.x),2) + Math.pow((square.position.y + square.height - midPoint.y), 2)) < radius -7){
		//console.log("point col");
		return true;
	}else if(Math.sqrt(Math.pow((square.position.x + square.width - midPoint.x),2) + Math.pow((square.position.y + square.height - midPoint.y), 2)) 
											< radius -7){
		//console.log("point col");
		return true;
	}
	
	//checks midpoint of circle doesnt overlap square
	if((midPoint.x >= square.position.x && midPoint.x <= square.position.x + square.width) 
								&& (midPoint.y >= square.position.y && midPoint.x <= square.position.y + square.height)){
		//console.log("midpoint inside");
		return true;
	}
	
	//console.log("false");
	return false;
}

//returns tile i,j
function getTile(mapy, x, y){
	var i = x - mapy[0][0].position.x;
	i = Math.floor(i/spriteWidth);
	var j = y - mapy[0][0].position.y;
	j = Math.floor(j/spriteWidth);
	return [i, j];
}

function getTileObj(mapy, obj){
	return getTile(mapy, obj.x, obj.y);
}
function canWalkHere(mapA, x, y){
	//return !(getTile(x,y).collision);
	return ((mapA[x] != null) &&
			(mapA[x][y] != null) &&
			!mapA[x][y].isWall);
}

function canWalkPos(map, x, y){
	tile = getTile(map, x, y);
	return canWalkHere(map,tile[0],tile[1]);
}
function updatePath(mapy, player, agent, graph){
	var start = getTile(mapy, agent.sp.position.x,
		   						   agent.sp.position.y);
	if(!start) {agent.followPath([]); return;}
	start = graph.grid[start[0]][start[1]];
	console.log(start);
	var end = getTile(mapy, player.sp.position.x,
			 			 player.sp.position.y);
	if(!end) {agent.followPath([]); return;}
	end = graph.grid[end[0]][end[1]];
	console.log(end);
		   		
	var path = astar.search(graph, start, end, { heuristic: astar.heuristics.diagonal });
	for(i=0;i<path.length;i++){
		if(!canWalkHere(mapy, path[i].x, path[i].y)) { console.log("bad path");return;}
	}
	if(path.length > 0) {
		agent.followPath(path);
		console.log(path);
	}
}

function moveObject(mapA, position, amount, up, down, left, right){
	
	tile = getTile(mapA, position.x, position.y);
	
	//check up and down for collision
	if(up || down){
	for(var i = tile[0] - 1; i <= tile[0] + 1; i++){
		if(mapA[i][tile[1] - 1].isWall && scCollide(mapA[i][tile[1] - 1], player.sp)){
			up = false;
		}
		if(mapA[i][tile[1] + 1].isWall && scCollide(mapA[i][tile[1] + 1], player.sp)){
			down = false;
		}
	}}
	
	//checks left and right for collision
	if(left || right){
	for(var i = tile[1] - 1; i <= tile[1] + 1; i++){
		if(mapA[tile[0] - 1][i].isWall && scCollide(mapA[tile[0] - 1][i], player.sp)){
			//console.log("left");
			left = false;
		}
		if(mapA[tile[0] + 1][i].isWall && scCollide(mapA[tile[0] + 1][i], player.sp)){
			right = false;
		}
	}}
	
	
	
	if(!tile) return;
	if(down){
		
		py = position.y + amount;
		dTile = getTile(mapA, position.x, py);
		if(py < mapA.length*spriteWidth
			&& canWalkHere(mapA, dTile[0], dTile[1]))
		position.y += amount;
	} else if(up){
		
		my = position.y - amount;
		uTile = getTile(mapA, position.x, my);
		if(position.y - amount > 0
			&& canWalkHere(mapA, uTile[0], uTile[1]))
		position.y -= amount;
	}
	if(left){
		
		mx = position.x - amount;
		lTile = getTile(mapA, mx, position.y);
		if(position.x - amount > 0
			&& canWalkHere(mapA, lTile[0], lTile[1]))
		position.x -= amount;
	} else if(right){
		
		px = position.x + amount;
		rTile = getTile(mapA, px, position.y);
		if(position.x + amount < mapA.length*spriteWidth
			&& canWalkHere(mapA, rTile[0], rTile[1]))
		position.x += amount;
	}
}

function inBounds(map, x, y){
	xmax = map.length * spriteWidth;
	ymax = map[0].length * spriteWidth;
	return ( ((x < xmax) && (x > -1))
			 || ((y < ymax) && (y > -1))
			);
}
