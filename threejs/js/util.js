var render, scene, camera, light, container;

function initRender(){
	container = document.getElementById('container');
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( container.clientWidth, container.clientHeight );
	container.appendChild( renderer.domElement );
	renderer.setClearColor(0xFFFFFF, 1.0);
}

function initScene(){
	scene = new THREE.Scene();
}

function initCamera(){
	camera = new THREE.PerspectiveCamera(45, container.clientWidth/container.clientHeight, 1, 10000);
	camera.position.x = 0;
	camera.position.y = 1000;
	camera.position.z = 0;
	camera.up.x = 0;
	camera.up.y = 0;
	camera.up.z = 1;
	camera.lookAt({
		x : 0,
		y : 0,
		z : 0
	});
}

function initLight() {
	light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
	light.position.set(100, 100, 200);
	scene.add(light);
}

function initObject(){
	var geometry = new THREE.Geometry();
    geometry.vertices.push( new THREE.Vector3( - 500, 0, 0 ) );
	geometry.vertices.push( new THREE.Vector3( 500, 0, 0 ) );

	for ( var i = 0; i <= 20; i ++ ) {
		var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x333333, opacity: 0.2 } ) );
		line.position.z = ( i * 50 ) - 500;
		scene.add( line );

		var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x333333, opacity: 0.2 } ) );
		line.position.x = ( i * 50 ) - 500;
		line.rotation.y = 90 * Math.PI / 180;
		scene.add( line );
	}
}

function start(){
	initRender();
	initScene();
	initCamera();
	//initLight();
	initObject();
	renderer.clear();
	renderer.render(scene, camera);
	
	animation();
}


function animation(){
	camera.position.x =camera.position.x +1;
	renderer.render(scene, camera);
	requestAnimationFrame(animation);
}