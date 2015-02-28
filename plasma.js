/**
 * @author Connor McNeill
 */

var Plasma = function(x, y, dir){
	this.sp = new PIXI.Sprite(PIXI.Texture.fromImage());
	this.sp.position.x = x;
	this.sp.position.y = y;
	this.dir = dir;
	stage.addChild(this.sp);
};
