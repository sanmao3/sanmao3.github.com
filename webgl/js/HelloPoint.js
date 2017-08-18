// 定点着色器
var VSHADER_SOURCE = `
	attribute vec4 a_Position;
	attribute float a_PointSize;
	void main(){
		gl_Position = a_Position;
		gl_PointSize = a_PointSize;
	}`;
	
// 片元着色器
var FSHADER_SOURCE = `
	precision mediump float;
	uniform vec4 u_FragColor;
	void main(){
		gl_FragColor = u_FragColor;
	}`;


function main(){
	var canvas = document.getElementById('glcanvas');
	
	var gl = getWebGLContext(canvas);
	
	if(!gl){
		console.log('failed to get the rendering context for webgl');
		return;
	}
	
	
	var vertexShader = createShader(gl, gl.VERTEX_SHADER, VSHADER_SOURCE);
	var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FSHADER_SOURCE);
	
	var program = createProgram(gl, vertexShader, fragmentShader);
	
	if(!program){
		console.log('failed to create program');
		return;
	}
	
	
	var a_Position = gl.getAttribLocation(program, 'a_Position');
	
	if(a_Position < 0){
		console.log('failed to get the storage location of a_Postion');
		return;
	}
	
	
	var a_PointSize = gl.getAttribLocation(program, 'a_PointSize');
	
	gl.vertexAttrib1f(a_PointSize, 10.0);
	
	
	
	var u_FragColor = gl.getUniformLocation(program, 'u_FragColor');
	
	if(!u_FragColor){
		console.log('failed to get u_FragColor variable');
		return;
	}
	
	
	canvas.onmousedown = function(e){
		clickCanvas(e, gl, canvas, a_Position, u_FragColor);
	};
	
	
	
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	gl.useProgram(program);
}


var g_points = [];
var g_colors = [];

function clickCanvas(e, gl, canvas, a_Position, u_FragColor){
	var x = e.clientX;
	var y = e.clientY;
	var rec = e.target.getBoundingClientRect();
	
	x = ((x - rec.left) - canvas.width / 2) / (canvas.width / 2);
	y = (canvas.height / 2 - (y - rec.top)) / (canvas.height / 2);
	
	
	g_points.push([x, y]);
	
	
	if(x >= 0.0 && y >= 0.0){
		g_colors.push([1.0, 0.0, 0.0, 1.0]);
	}else if(x < 0.0 && y < 0.0){
		g_colors.push([0.0, 1.0, 0.0, 1.0]);
	}else{
		g_colors.push([1.0, 1.0, 1.0, 1.0]);
	}
	
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	for(var i = 0, len = g_points.length; i < len; i++){
		var xy = g_points[i];
		var rgba = g_colors[i];
		
		gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
		gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
		gl.drawArrays(gl.POINTS, 0, 1);
	}
}
