/**
 * @author Max Kerscher-Santelli
 */
var x;
var y;
var spriteWidth = 75;

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
			//this.mapA[i].push(new Tile(x,y));
			this.mapA[i].push(new PIXI.Sprite(PIXI.Texture.fromImage("images/Untitled-1.jpg")));
			this.mapA[i][j].position.x = x;
			this.mapA[i][j].position.y = y;
			stage.addChild(this.mapA[i][j]);
		}	
	}
	console.log("new map created");
};

Map.prototype.test = function(){
	console.log("map.test");
};

Map.prototype.update = function(up, down, left, right){
	for(i = 0; i < this.width; i++){
		for(j = 0; j < this.height; j++){
			//this.mapA[i][j].update(up, down, left, right);
			if(up){
				this.mapA[i][j].position.y -= 5;
			}
			if(down){
				this.mapA[i][j].position.y += 5;
			}
			if(right){
				this.mapA[i][j].position.x += 5;
			}
			if(left){
				this.mapA[i][j].position.x -= 5;
			}
	
			if(this.mapA[i][j].position.x < -70 || this.mapA[i][j].position.x > 700 || 
											this.mapA[i][j].position.y < -70 || this.mapA[i][j].position.y > 700){
				this.mapA[i][j].visible = false;
			}else{
				this.mapA[i][j].visible = true;
			}
		}
	}
	console.log("map update");
};

