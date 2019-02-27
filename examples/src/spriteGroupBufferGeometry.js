/* eslint-disable no-console */
/* eslint-env browser */
import * as THREE from 'three';
import { ThreeCanvas, VODescriptor, VOIndices, SpriteGroup, SpriteGroupBufferGeometry } from '../../src';

const debug = (name, obj) => {
  console.log(name, obj);
  window[name] = obj;
};

const threeCanvas = new ThreeCanvas(document.getElementById('container'), {
  alpha: false,
  clearColor: 'skyblue',
});

const camera = new THREE.PerspectiveCamera(75, threeCanvas.width / threeCanvas.height, 0.1, 100);
camera.position.z = 30;
camera.position.y = 10;
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const makeWireframe = (geometry, color = 0xffffff) => new THREE.LineSegments(
  new THREE.WireframeGeometry(geometry),
  new THREE.LineBasicMaterial({ color }),
);

const makeMesh = (geometry, color = 0xffffff) => new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({
    color,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.666,
  }),
);

const triangleDescriptor = new VODescriptor({

  vertexCount: 3,

  attributes: [{
      name: 'position', scalars: ['x', 'y', 'z'],
  }],

});

const spriteGroup = new SpriteGroup(triangleDescriptor, {

  capacity: 10,

  voIndices: VOIndices.buildTriangles,

});

const [s0, s1, s2] = spriteGroup.createSprites(3);

s0.setPosition(
  -6, 0, 0,
  0, 6, 0,
  6, 0, 0,
);

s1.setPosition(
  -9, -1, 0,
  0, -7, 0,
  9, -1, 0,
);

s2.setPosition(
  0, -5, -7,
  0, 1, 0,
  0, -5, 7,
);

const spriteGroupGeometry = new SpriteGroupBufferGeometry(spriteGroup);
const triangles = makeMesh(spriteGroupGeometry, 0xff0066);

triangles.onBeforeRender = (renderer, scene, camera, geometry /*, material, group */) => {
  const { spriteGroup: { usedCount, indices: { itemCount }} } = geometry.parameters;
  geometry.setDrawRange(0, usedCount * itemCount);

  // wireframe:
  // spriteGroupGeometry.setDrawRange(0, count);
  // geometry.setDrawRange(0, count /* wireframe geometry renders individual lines, so we need to double our count here */ << 1);
};

scene.add(triangles);

const cube = makeWireframe(new THREE.BoxBufferGeometry(10, 10, 10), 0xffffe5);
scene.add(cube);

const yAxis = new THREE.Vector3(0, 1, 0);

threeCanvas.addEventListener('frame', ({ renderer, width, height, deltaTime }) => {

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  scene.rotateOnAxis(yAxis, deltaTime);

  renderer.render(scene, camera);

});

threeCanvas.start();

debug('threeCanvas', threeCanvas);
debug('cube', cube);
debug('triangleDescriptor', triangleDescriptor);
debug('spriteGroup', spriteGroup);
debug('spriteGroupGeometry', spriteGroupGeometry);
debug('triangles', triangles);
debug('s0', s0);
debug('s1', s1);
