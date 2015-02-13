/**
 * @author Max Kerscher-Santelli
 */

var Map = function(){
	console.log("new map created");
	for(var i = 0; i < 10; i++){
		var x = i * 50;
		var tile = new Tile(x,5);
		console.log("for loop: " + i);
	}
};

Map.prototype.test = function(){
	console.log("map.test");
};

Map.prototype.newTile = function(){
	var tile = new Tile(5,5);
	tile.test();
};
