/**
 * @author Max Kerscher-Santelli
 */
var x;
var y;
var spriteWidth = 75;
var pLocation;

var Map = function(width, height){
	this.mapA = [];
	this.width = width;
	this.height = height;
	for(i = 0; i < width; i++){
		this.mapA[i] = [];
	}
	x = 0;
	y = 0;
	
	for(i = 0; i < width; i++){
		x = i * spriteWidth;
		for(j = 0; j < height; j++){
			y = j * spriteWidth;
			this.mapA[i].push(new PIXI.Sprite(PIXI.Texture.fromImage("images/Untitled-1.jpg")));
			this.mapA[i][j].position.x = x;
			this.mapA[i][j].position.y = y;
			if(x <= (renderer.width/2) && x >= ((renderer.width/2) - spriteWidth) 
												&& y <= (renderer.height/2) && y >= ((renderer.height/2) - spriteWidth)){
				pLocation = {x: i, y: j};
				this.mapA[i][j].visible = false;
			}
			if(i == 0 || i == width - 1 || j == 0 || j == height -1){
				Object.defineProperty(this.mapA[i][j], 'collision', {value: true});
			}else{
				Object.defineProperty(this.mapA[i][j], 'collision', {value: false});
			}
			
			stage.addChild(this.mapA[i][j]);
		}	
	}
	console.log("new map created");
};

Map.prototype.test = function(){
	console.log("map.test");
};

Map.prototype.update = function(up, down, left, right){
	for(var i = pLocation.x -1; i <= pLocation.x +1; i++){
		if(this.mapA[i][pLocation.y - 1].collision){
			up = false;
		}
		if(this.mapA[i][pLocation.y + 1].collision){
			down = false;
		}
	}

	for(var i = pLocation.y -1; i <= pLocation.y +1; i++){
		if(this.mapA[pLocation.x - 1][i].collision){
			left = false;
		}
		if(this.mapA[pLocation.x +1][i].collision){
			right = false;
		}
	}
	
	for(i = 0; i < this.width; i++){
		for(j = 0; j < this.height; j++){
			if(up){
				this.mapA[i][j].position.y += 5;
			}
			if(down){
				this.mapA[i][j].position.y -= 5;
			}
			if(right){
				this.mapA[i][j].position.x -= 5;
			}
			if(left){
				this.mapA[i][j].position.x += 5;
			}
	
			if(this.mapA[i][j].position.x < -70 || this.mapA[i][j].position.x > 700 || 
											this.mapA[i][j].position.y < -70 || this.mapA[i][j].position.y > 700){
				this.mapA[i][j].visible = false;
			}else{
				this.mapA[i][j].visible = true;
			}
			
			if(this.mapA[i][j].position.x <= (renderer.width/2) && this.mapA[i][j].position.x > ((renderer.width/2) - spriteWidth) 
							&& this.mapA[i][j].position.y <= (renderer.height/2) && this.mapA[i][j].position.y > ((renderer.height/2) - spriteWidth)){
				pLocation = {x: i, y: j};
				this.mapA[i][j].visible = false;
			}
		}
	}
	console.log("map update");
};

function collide(sp1, sp2){
	var d = sp1.width/2 + sp2.width/2;
	var dist = Math.sqrt((sp1.position.x - sp2.position.x)^2 + (sp1.position.y - sp2.position.y)^2);
	return(dist < d);
};

