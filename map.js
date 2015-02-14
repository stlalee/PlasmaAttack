/**
 * @author Max Kerscher-Santelli
 */
var x;
var y;

var Map = function(width, height){
	this.mapA = [];
	this.width = width;
	this.height = height;
	for(i = 0; i < width; i++){
		this.mapA[i] = [];
	}
	x = 0;
	y = 0;
	console.log("new map created");
	for(i = 0; i < width; i++){
		x = i * 75;
		for(j = 0; j < height; j++){
			y = j * 75;
			this.mapA[i].push(new Tile(x,y));
		}	
	}
};

Map.prototype.test = function(){
	console.log("map.test");
};

Map.prototype.update = function(up, down, left, right){
	console.log("map update");
	for(i = 0; i < this.width; i++){
		for(j = 0; j < this.height; j++){
			this.mapA[i][j].update(up, down, left, right);
		}
	}
};
