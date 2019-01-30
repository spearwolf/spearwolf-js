/* eslint-disable no-console */
/* eslint-env browser */
import * as THREE from 'three';
import { ThreeCanvas } from '../../src';

const tc = new ThreeCanvas(document.getElementById('container'), {
  alpha: false,
  clearColor: 'skyblue',
});

tc.addEventListener('resize', (ev) => {
  console.log('Resize to:', ev);
})

const camera = new THREE.PerspectiveCamera(75, tc.width / tc.height, 0.1, 100);
camera.position.z = 30;
camera.position.y = 10;
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
const cube = new THREE.LineSegments(
  new THREE.EdgesGeometry(new THREE.BoxBufferGeometry(10, 10, 10)),
  new THREE.LineBasicMaterial({ color: 0xffffff }),
);
scene.add(cube);

const yAxis = new THREE.Vector3(0, 1, 0);

tc.addEventListener('frame', ({ renderer, width, height, deltaTime }) => {

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  scene.rotateOnAxis(yAxis, deltaTime);

  renderer.render(scene, camera);

});

tc.start();

console.log('threeCanvas', tc);
window.tc = tc;
