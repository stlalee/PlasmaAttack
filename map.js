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

	for(i = 0; i < level.length; i++){
		this.mapA[i] = [];
	}
	
	for(i = 0; i < level.length; i++){
		for(j = 0; j < level[0].length; j++){
			if(level[i][j] == 1){
				this.mapA[i].push(new PIXI.Sprite(PIXI.Texture.fromImage("images/Untitled-1.jpg")));
				Object.defineProperty(this.mapA[i][j], 'collision', {value: true});
			}else{
				this.mapA[i].push(new PIXI.Sprite(PIXI.Texture.fromImage("images/assets/PNGs/broken tile.png")));
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
	console.log("new map created");
};

Map.prototype.test = function(){
	console.log("map.test");
};

//runs everytime we cal update
Map.prototype.update = function(up, down, left, right){
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
	/*for(var i = 0; i < this.agents.length; i++){
		if(cCollide(player.sp, this.agents[i].sp)){
			//I know this is dumb but it'll do for now
			this.agents[i].interval = 
				setInterval(function(){player.takeHit(5);},
							this.agents[i].attackDelay);
		} else {
			clearInterval(this.agents[i].interval);
		}
		
	}*/
	console.log(this.agents);
	//moves agents with the map (currently just enemies, but in the future might also be allies?)
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
	}
	
	//moves tiles
	for(i = 0; i < this.mapA.length; i++){
		for(j = 0; j < this.mapA[i].length; j++){
			if(up){
				this.mapA[i][j].position.y += 7;
			}
			if(down){
				this.mapA[i][j].position.y -= 7;
			}
			if(right){
				this.mapA[i][j].position.x -= 7;
			}
			if(left){
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
	console.log("map update");
};

//returns array of tile i,j
function getTile(x, y){
	var i = Math.floor(x/spriteWidth);
	var j = Math.floor(y/spriteWidth);
	return [i, j];
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


