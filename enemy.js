/**
 * @author Connor McNeill
 */

var enemy = function(x, y){
	this.sp = new PIXI.Sprite(PIXI.Texture.fromImage("OldMan.png"));
	this.sp.position.x = x;
	tihs.sp.position.y = y;
	stage.addChild(this.sp);
};
