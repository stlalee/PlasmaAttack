/**
 * @author Connor McNeill
 */

var sp;

var Player = function(){
	sp = new PIXI.Sprite(PIXI.Texture.fromImage("images/circle.png"));
	sp.position.x = 315;
	sp.position.y = 315;
	stage.addChild(sp);
};

Map.prototype.Player = function(){
	console.log("player test");
};