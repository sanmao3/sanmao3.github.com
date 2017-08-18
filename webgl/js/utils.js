// 获取WebGL绘图上下文
function getWebGLContext(canvas) {
	window.gl = null;

	try {
		// 尝试获取标准上下文，如果失败，回退到试验性上下文
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
	} catch(e) {}

	// 如果没有GL上下文，马上放弃
	if(!gl) {
		alert("WebGL初始化失败，可能是因为您的浏览器不支持。");
		gl = null;
	}
	return gl;
}

// 创建着色器，输入参数：渲染上下文，着色器类型，数据源
function createShader(gl, type, source) {
	var shader = gl.createShader(type); // 创建着色器对象
	gl.shaderSource(shader, source); // 提供数据源
	gl.compileShader(shader); // 编译 -> 生成着色器
	var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if(success) {
		return shader;
	}

	console.log(gl.getShaderInfoLog(shader));
	gl.deleteShader(shader);
}

// 着色程序
function createProgram(gl, vertexShader, fragmentShader) {
	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	var success = gl.getProgramParameter(program, gl.LINK_STATUS);
	if(success) {
		return program;
	}

	console.log(gl.getProgramInfoLog(program));
	gl.deleteProgram(program);
}