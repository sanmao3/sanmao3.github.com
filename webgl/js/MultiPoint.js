// 定点着色器
var VSHADER_SOURCE = `
	attribute vec4 a_Position;
	void main(){
		gl_Position = a_Position;
	}`;
	
// 片元着色器
var FSHADER_SOURCE = `
	void main(){
		gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
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
	
	
	var n = initVertexBuffers(gl, program);
	if(n < 0){
		console.log('failed to set the positions of the vertices');
		return;
	}
	
	
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	gl.useProgram(program);
	
	// 1.mode
	gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
}

function initVertexBuffers(gl, program){
	var vertices = new Float32Array([
		-0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5
	]);
	
	var n = 4;
	
	var vertexBuffer = gl.createBuffer();
	
	if(!vertexBuffer){
		console.log('failed to create the buffer object');
		return -1;
	}
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	
	var a_Position = gl.getAttribLocation(program, 'a_Position');
	if(a_Position < 0){
		console.log('failed to get the storage location of a_Postion');
		return -1;
	}
	
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
	
	gl.enableVertexAttribArray(a_Position);
	
	return n;
}
