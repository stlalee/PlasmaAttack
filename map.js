/**
 * @author Max Kerscher-Santelli
 */

var spriteWidth = 75;
var pLocation;
//var agents;

//creates new map based on level given
var Map = function(level){
	this.agents = [];
	this.mapA = [];
	this.projectiles = [];
	this.items = [];
	
	
	for(i = 0; i < level.length; i++){
		this.mapA[i] = [];
	}
	
	for(i = 0; i < level.length; i++){
		for(j = 0; j < level[0].length; j++){
			if(level[i][j] == 1){
				this.mapA[i].push(new PIXI.Sprite(PIXI.Texture.fromImage("images/Untitled-1.jpg")));
				Object.defineProperty(this.mapA[i][j], 'collision', {value: true});
			}else{
				this.mapA[i].push(new PIXI.Sprite(PIXI.Texture.fromImage("images/assets/ground.png")));
				Object.defineProperty(this.mapA[i][j], 'collision', {value: false});
			}
			
			this.mapA[i][j].position.x = i * spriteWidth;
			this.mapA[i][j].position.y = j * spriteWidth;
			
			if((i * spriteWidth) <= (renderer.width/2) && (i * spriteWidth) >= ((renderer.width/2) - spriteWidth) 
											&& (j * spriteWidth) <= (renderer.height/2) && (j * spriteWidth) >= ((renderer.height/2) - spriteWidth)){
				pLocation = {x: i, y: j};
			}
			
			stage.addChild(this.mapA[i][j]);
		}	
	}
	
	this.items.push(new PIXI.Sprite(PIXI.Texture.fromImage("images/health pack.png")));
	this.items[0].position.x = 200;
	this.items[0].position.y = 400;
	stage.addChild(this.items[0]);
	console.log("new map created");
};

Map.prototype.test = function(){
	console.log("map.test");
};

//runs everytime we cal update
Map.prototype.update = function(up, down, left, right, space){
	if(this.items.length == 1 && scCollide(this.items[0], player.sp)){
		stage.removeChild(this.items[0]);
		this.items.shift();
		player.health += 50;
	}
	if(space){
		player.shootPlasma();
		var plasma = new Plasma(player.sp.position.x, player.sp.position.y, player.facing);
		this.projectiles.push(plasma);
	}
	for(i=0;i<this.projectiles.length;i++){
		var pro = this.projectiles[i];
		//check collision with agents
		for(j=0;j<this.agents.length;j++){
			if(!this.agents.ally && cCollide(pro.sp, this.agents[j].sp)){
				this.agents[j].takeHit(6);
				stage.removeChild(this.projectiles[i].sp);
				this.projectiles.splice(i,1);
			} else {
				if(pro.dir == "up"){
					pro.sp.position.y -= 3;
				}
				if(pro.dir == "down"){
					pro.sp.position.y += 3;
				}
				if(pro.dir == "left"){
					pro.sp.position.x -= 3;
				}
				if(pro.dir == "right"){
					pro.sp.position.x += 3;
				}
			}
		}
	}
	//check up and down for collision
	for(var i = pLocation.x - 1; i <= pLocation.x + 1; i++){
		if(this.mapA[i][pLocation.y - 1].collision && scCollide(this.mapA[i][pLocation.y - 1], player.sp)){
			up = false;
		}
		if(this.mapA[i][pLocation.y + 1].collision && scCollide(this.mapA[i][pLocation.y + 1], player.sp)){
			down = false;
		}
	}
	//checks left and right for collision
	for(var i = pLocation.y - 1; i <= pLocation.y + 1; i++){
		if(this.mapA[pLocation.x - 1][i].collision && scCollide(this.mapA[pLocation.x - 1][i], player.sp)){
			console.log("left");
			left = false;
		}
		if(this.mapA[pLocation.x + 1][i].collision && scCollide(this.mapA[pLocation.x + 1][i], player.sp)){
			right = false;
		}
	}
	//naive collision check with enemies, take hit if colliding
	for(var i = 0; i < this.agents.length; i++){
		if(!this.agents[i].resting && cCollide(player.sp, this.agents[i].sp)){
			//I know this is dumb but it'll do for now
			player.takeHit(5);
			this.agents[i].rest();
		}
	}
	console.log(this.agents);
	if(this.items.length == 1){
		if(up){
			this.items[0].position.y += 7;
		}
		if(down){
			this.items[0].position.y -= 7;
		}
		if(right){
			this.items[0].position.x -= 7;
		}
		if(left){
			this.items[0].position.x += 7;
		}
	}
	//moves agents with(in) the map (currently just enemies, but in the future might also be allies?)
	for(i = 0; i < this.agents.length; i++){
		if(up){
			this.agents[i].sp.position.y += 7;
		}
		if(down){
			this.agents[i].sp.position.y -= 7;
		}
		if(right){
			this.agents[i].sp.position.x -= 7;
		}
		if(left){
			this.agents[i].sp.position.x += 7;
		}
		
		if(distance(player.sp.position, this.agents[i].sp.position) < 250){
			/*
			if(this.agents[i].currentPath == null){
				this.agents[i].followPath(
		   			findPath(this.mapA,
		   					getTile(this.agents[i].sp.position.x,
		   							 this.agents[i].sp.position.y), 
		   				 	 getTile(player.sp.position.x,
		   				 			 player.sp.position.y)));
			} else {
				//currentPath exists, try to follow it
				if(this.agents[i].currentPath.length > 0){
					var nextPoint = this.agents[i].currentPath[0];
					nextPoint.x *= spriteWidth;
					nextPoint.y *= spriteWidth;
					var curPos = this.agents[i].sp.position;
					if(distance(nextPoint, curPos) < 20){
						//close enough
						this.agents[i].currentPath.shift();
					} else {
						if(nextPoint.x - curPos.x > 0){
							this.agents[i].sp.position.x += 3;
						}
						if(nextPoint.x - curPos.x < 0){
							this.agents[i].sp.position.x -= 3;
						}
						if(nextPoint.y - curPos.y > 0){
							this.agents[i].sp.position.y += 3;
						}
						if(nextPoint.y - curPos.y < 0){
							this.agents[i].sp.position.y -= 3;
						}
					}
				}
			}*/
			//if(this.agents[i].currentPath.length > 0){
				var nextPoint = player.sp.position;
				//nextPoint.x *= spriteWidth;
				//nextPoint.y *= spriteWidth;
				var curPos = this.agents[i].sp.position;
				if(distance(nextPoint, curPos) < 20){
					//close enough
					//this.agents[i].currentPath.shift();
				} else {
					if(nextPoint.x - curPos.x > 0){
						this.agents[i].sp.position.x += 3;
					}
					if(nextPoint.x - curPos.x < 0){
						this.agents[i].sp.position.x -= 3;
					}
					if(nextPoint.y - curPos.y > 0){
						this.agents[i].sp.position.y += 3;
					}
					if(nextPoint.y - curPos.y < 0){
						this.agents[i].sp.position.y -= 3;
					}
				}
			//}
		} else {
			this.agents[i].currentPath = null;
		}
	}
	
	//moves tiles
	for(i = 0; i < this.mapA.length; i++){
		for(j = 0; j < this.mapA[i].length; j++){
			if(up){
				player.facing = "up";
				this.mapA[i][j].position.y += 7;
			}
			if(down){
				player.facing = "down";
				this.mapA[i][j].position.y -= 7;
			}
			if(right){
				player.facing = "right";
				this.mapA[i][j].position.x -= 7;
			}
			if(left){
				player.facing = "left";
				this.mapA[i][j].position.x += 7;
			}
			
			//stops onscreen tiles from being drawn
			if(this.mapA[i][j].position.x < -70 || this.mapA[i][j].position.x > 700 || 
											this.mapA[i][j].position.y < -70 || this.mapA[i][j].position.y > 700){
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
	//this.healthMeter.setText(player.health);
	console.log("map update");
};

function distance(p1, p2){
	return Math.sqrt(Math.pow(p1.x - p2.x, 2)+Math.pow(p1.y - p2.y,2));
}

//returns tile i,j
function getTile(x, y){
	var i = Math.floor(x/spriteWidth);
	var j = Math.floor(y/spriteWidth);
	return [i, j];
}

function canWalkHere(mapA, x,y){
	//return !(getTile(x,y).collision);
	return ((mapA[x] != null) &&
			(mapA[x][y] != null) &&
			!mapA[x,y].collision);
}
//WIP AStar algorithm
function findPath(mapy, begin, end){
	mapHeight = mapy.length;
	mapWidth = mapy[0].length;
	mapSize = mapy[0].length * mapy.length;
	
	function Neighbors(x,y){
		var up = y - 1;
		var down = y + 1;
		var right = x - 1;
		var left = x + 1;
		
		var blah = new Object;
		blah.up = up > -1 && canWalkHere(mapy,x,up);
		blah.down = down < mapHeight && canWalkHere(mapy,x, down);
		blah.right = right < mapWidth && canWalkHere(mapy,right, y);
		blah.left = left > -1 && canWalkHere(mapy,left, y);
		
		result = [];
		if(blah.up){
			result.push({x:x, y:up});
		}
		if(blah.down){
			result.push({x:x, y:down});
		}
		if(blah.right){
			result.push({x:right, y:y});
		}
		if(blah.left){
			result.push({x:left, y:y});
		}
		//findNeighbors(blah, up, down, right, left, result);
		blah.up = up > -1;
		blah.down = down < mapHeight;
		blah.right = right < mapWidth;
		blah.left = left > -1;
		
		if(blah.right){
			if(blah.up && canWalkHere(mapy,right, up)) result.push({x:right, y:up});
			if(blah.down && canWalkHere(mapy,right, down)) result.push({x:right, y:down});
		}
		if(blah.left){
			if(up && canWalkHere(mapy,left, up)) result.push({x:left, y:up});
			if(down && canWalkHere(mapy,left, down)) result.push({x:left, y:down});
		}
		
		return result;
	}
	
	function Node(Parent, Point){
		var newNode = {
			Parent:Parent,
			value:Point.x + (Point.y * mapWidth),
			x:Point.x,
			y:Point.y,
			f:0,
			g:0
		};
		return newNode;
	}
	
	function calcPath(){
		var pathStart = Node(null, {x:begin[0], y:begin[1]});
		var pathEnd = Node(null, {x:end[0], y:end[1]});
		
		var AStar = new Array(mapSize);
		var Open = [pathStart];
		var Closed = [];
		var result = [];
		var myNeighbors;
		var myNode;
		var myPath;
		var length,max,min,i,j;
		
		while(length = Open.length){
			max = mapSize;
			min = -1;
			for(i=0;i<length;i++){
				if(Open[i].f < max){
					max = Open[i].f;
					min = i;
				}
				myNode = Open.splice(min, 1)[0];
				if(myNode.value === pathEnd.value){
					myPath = Closed[Closed.push(myNode) -1];
					do{
						result.push([myPath.x,myPath,y]);
					} while(myPath = myPath.Parent);
					AStar = Closed = Open = [];
					result.reverse();
				} else {
					myNeighbors = Neighbors(myNode.x, myNode.y);
					for(i=0, j=myNeighbors.length;i<j;i++){
						myPath = Node(myNode,myNeighbors[i]);
						if(!AStar[myPath.value]){
							myPath.g = myNode.g + distance(myNeighbors[i],myNode);
							// estimated cost of entire guessed route to the destination
							myPath.f = myPath.g + distance(myNeighbors[i], pathEnd);
							// remember this new path for testing above
							Open.push(myPath);
							// mark this node in the world graph as visited
							AStar[myPath.value] = true;
						}
					}
					// remember this route as having no more untested options
					Closed.push(myNode);
				}
			} // keep iterating until until the Open list is empty
			return result;
		}
	}
	
	return calcPath();
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
	console.log("start new col");
	
	//checks if circle overlaps top or bottom edge of square
	if(midPoint.x >= square.position.x && midPoint.x <= square.position.x + square.width){
		if(midPoint.y - (square.position.y + square.height) < radius && midPoint.y - (square.position.y + square.height) > 0){
			console.log("line col top or bottom");
			return true;
		}
		if(square.position.y - midPoint.y < radius && square.position.y - midPoint.y > 0){
			console.log("line col top or bottom");
			return true;
		}
	}
	
	//check is circle is overlaps sides of square
	if(midPoint.y >= square.position.y && midPoint.y <= square.position.y + square.height){
		if(midPoint.x - (square.position.x + square.width) < radius && midPoint.x - (square.position.x + square.width) > 0){
			console.log("line col left or right");
			return true;
		}
		if(square.position.x - midPoint.x < radius && square.position.x - midPoint.x > 0){
			console.log("line col left or right");
			return true;
		}
	}
	
	//checks if circle overlaps a corner
	if(Math.sqrt(Math.pow((square.position.x - midPoint.x),2) + Math.pow((square.position.y - midPoint.y), 2)) < radius -7){
		console.log("point col");
		return true;
	}else if(Math.sqrt(Math.pow((square.position.x + square.width - midPoint.x),2) + Math.pow((square.position.y - midPoint.y), 2)) < radius -7){
		console.log("point col");
		return true;
	}else if(Math.sqrt(Math.pow((square.position.x - midPoint.x),2) + Math.pow((square.position.y + square.height - midPoint.y), 2)) < radius -7){
		console.log("point col");
		return true;
	}else if(Math.sqrt(Math.pow((square.position.x + square.width - midPoint.x),2) + Math.pow((square.position.y + square.height - midPoint.y), 2)) 
											< radius -7){
		console.log("point col");
		return true;
	}
	
	//checks midpoint of circle doesnt overlap square
	if((midPoint.x >= square.position.x && midPoint.x <= square.position.x + square.width) 
								&& (midPoint.y >= square.position.y && midPoint.x <= square.position.y + square.height)){
		console.log("midpoint inside");
		return true;
	}
	
	console.log("false");
	return false;
}


