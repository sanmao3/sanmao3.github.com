/* gen: 树枝的节点代数，默认是6个节点*/
/* angle: 每次在节点树枝的旋转角度*/
/* branchLength: 树枝的长度*/
function Tree( /*color, angle, genNum, branchLength*/ ) {
	this.x = 150;
	this.y = 200;
	this.scaleX = 0.85;
	this.scaleY = 0.85;
	this.gen = 0;
	this.alpha = 1;
	this.color = '#333';
	this.angle = 0.3;
	this.genNum = 6;
	this.branchLength = 40;

}

Tree.prototype.draw = function(ctx) {
	ctx.save()
	ctx.translate(this.x, this.y);
	this.branch(ctx, 0); //初始角度为0， 绘制树干
	ctx.restore();
}

Tree.prototype.branch = function(ctx, initAngle) {
	this.gen++;
	ctx.save();
	ctx.strokeStyle = this.color;
	ctx.rotate(initAngle);
	ctx.scale(this.scaleX, this.scaleY);

	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.translate(0, -this.branchLength);
	ctx.lineTo(0, 0);
	ctx.stroke();

	if(this.gen <= this.genNum) { //判断当前的节点代数是否大于设置的节点数
		this.branch(ctx, this.angle); //画右边树枝
		this.branch(ctx, -this.angle); //画左侧树枝
	}
	ctx.restore();

	this.gen--;
}