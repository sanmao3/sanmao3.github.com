// TODO: 版本改成最新0.139.2时，在线编辑器会报错，0.121.1
import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
import { TransformControls } from "TransformControls";

const canvas = document.querySelector(".webgl");
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};
let textFont = null;

// Scene
const scene = new THREE.Scene();

// Grid helper
const gridHelper = new THREE.GridHelper(20, 20, "#145c9f", "#316186");
scene.add(gridHelper);

// Text
const fontLoader = new THREE.FontLoader();
const textMaterial = new THREE.MeshBasicMaterial({ color: '#135b9e' });
fontLoader.load('examples/threejs/fonts/Microsoft YaHei_Regular.json', (font) => {
  textFont = font;
  const textGeometry = new THREE.TextGeometry('网络大屏', {
    font: font,
    size: 1,
    height: 0.2
  });
  textGeometry.center();
  const text = new THREE.Mesh(textGeometry, textMaterial);
  text.rotation.y = Math.PI * 0.5;
  text.position.x = -10;
  text.position.y = 0.65;
  scene.add(text)
});

// Objects
const grid = [
  [1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 1]
];
const nodes = [{
  id: 1
}, {
  id: 2
}, {
  id: 3
}]
const cubeGeometry = new THREE.BoxGeometry(1, 1, 0.5)
const cubeDistance = 4
const objects = [];
for (let i = 0; i < nodes.length; i++) {
  let cube = new THREE.Mesh(
    cubeGeometry,
    new THREE.MeshBasicMaterial({ color: "#3d9ecd" })
  );
  cube.position.set(0, 0.5, - i * cubeDistance);
  nodes[i].object = cube
  scene.add(cube);
  objects.push(cube);
}

const links = [{
  source: 1,
  target: 2
}, {
  source: 2,
  target: 3
}]

// Line
const linePointsCount = 2;
const lineMaterial = new THREE.LineDashedMaterial({
  color: 0xff00ff,
  dashSize: 0.2,
  gapSize: 0.1
});
for (let k = 0; k < links.length; k++) {
  const linePositions = new Float32Array(linePointsCount * 3);

  const sourceNode = nodes.find(item => item.id == links[k].source)
  const targetNode = nodes.find(item => item.id == links[k].target)

  linePositions[0] = sourceNode.object.position.x;
  linePositions[1] = 0;
  linePositions[2] = sourceNode.object.position.z;

  linePositions[3] = targetNode.object.position.x;
  linePositions[4] = 0;
  linePositions[5] = targetNode.object.position.z;

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

  const line = new THREE.Line(lineGeometry, lineMaterial);
  line.computeLineDistances();
  links[k].object = line;
  scene.add(line);
}

// Particles
const particlesCount = 200;
const positions = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount; i++) {
  positions[i * 3 + 0] = (Math.random() - 0.5) * 40;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
}
const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
const particlesMaterial = new THREE.PointsMaterial({
  color: "yellow",
  size: 0.08
});
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  1,
  1000
);
camera.position.set(15, 4, 0);
camera.lookAt(new THREE.Vector3());

// Lights
const light = new THREE.AmbientLight();
scene.add(light);

// Render
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Orbit controls
const controls = new OrbitControls(camera, canvas);
// controls.enabled = false;
controls.enableDamping = true;
controls.maxDistance = 50;
controls.minDistance = 2;
controls.update();

// Transform controls
const transformControls = new TransformControls(camera, canvas);
transformControls.showY = false;
transformControls.addEventListener("dragging-changed", function (event) {
  controls.enabled = !event.value;
});
transformControls.addEventListener("objectChange", function (event) {
  // 移动节点时更新连接线坐标
  for (let k = 0; k < links.length; k++) {
    const sourceNode = nodes.find(item => item.id == links[k].source)
    const targetNode = nodes.find(item => item.id == links[k].target)

    if (sourceNode.object === currentIntersect.object || targetNode.object === currentIntersect.object) {
      let lineVector = links[k].object.geometry.attributes.position.array;

      lineVector[0] = THREE.Math.clamp(sourceNode.object.position.x, -10, 10);
      lineVector[1] = 0;
      lineVector[2] = THREE.Math.clamp(sourceNode.object.position.z, -10, 10);

      lineVector[3] = THREE.Math.clamp(targetNode.object.position.x, -10, 10);
      lineVector[4] = 0;
      lineVector[5] = THREE.Math.clamp(targetNode.object.position.z, -10, 10);

      links[k].object.geometry.attributes.position.needsUpdate = true;
    }
  }
});
scene.add(transformControls);

// Resize
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Double click
window.addEventListener("dblclick", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    canvas.requestFullscreen();
  }
});

// Mouse move
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let currentIntersect = null;

window.addEventListener("mousemove", (event) => {
  // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;

  // 通过摄像机和鼠标位置更新射线
  raycaster.setFromCamera(mouse, camera);
  // 计算物体和射线的焦点
  const intersects = raycaster.intersectObjects(objects, false);
  for (const object of objects) {
    object.material.color.set("#3d9ecd");
  }
  for (const intersect of intersects) {
    intersect.object.material.color.set("#1761a2");
  }
  if (intersects.length) {
    if (currentIntersect === null) {
      // mouse enter
      transformControls.attach(intersects[0].object);
    }
    currentIntersect = intersects[0];
  } else {
    if (currentIntersect) {
      // mouse leave
      if (transformControls.object === currentIntersect.object) {
        transformControls.detach();
      }
    }
    currentIntersect = null;
  }
});

// Pointer down
const clock = new THREE.Clock();
window.addEventListener("pointerdown", () => {
  clock.start();
});

// Pointer up
window.addEventListener("pointerup", () => {
  const elapsedTime = clock.getElapsedTime()
  if (currentIntersect && elapsedTime < 0.2) {
    // Warning info
    const infoGeometry = new THREE.TextGeometry('zabbix报警', {
      font: textFont,
      size: 0.5,
      height: 0
    });
    const info = new THREE.Mesh(infoGeometry, textMaterial);
    info.rotation.x = - Math.PI * 0.5;
    scene.add(info)
  }
  clock.stop();
});

// Animation
const tick = () => {
  // 限制物体移动范围
  if (currentIntersect) {
    currentIntersect.object.position.clamp(new THREE.Vector3(-10, -10, -10), new THREE.Vector3(10, 10, 10))
  }
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();