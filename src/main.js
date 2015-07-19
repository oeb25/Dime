import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshLambertMaterial,
  Mesh,
  AmbientLight,
  DirectionalLight
} from 'three';

import FPSCamera from './FPSCamera';

const scene = new Scene;
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshLambertMaterial({ color: 0xaaffff });
const cube = new Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const light = new AmbientLight(0x000044, 0.5);
scene.add(light);

const dirLight = new DirectionalLight(0xffffff);
dirLight.position.set(1, 1, 1).normalize();
scene.add(dirLight);

const player = new FPSCamera(renderer.domElement);
scene.add(player);

const sensitivity = 0.0005;

player.onRotate(rotate => {
  camera.rotation.y = rotate.x * sensitivity;
  camera.rotation.x = rotate.y * sensitivity;
});

function render() {
  cube.rotation.x += 0.05;
  cube.rotation.y += 0.01;

  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
