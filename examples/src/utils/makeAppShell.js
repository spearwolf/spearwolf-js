/* eslint-disable no-console */
/* eslint-env browser */
import * as THREE from 'three';

import { makeWireframe } from './makeWireframe';
import { debug } from './debug';

import { ThreeCanvas } from '../../../src';

export const makeAppShell = async (el, options, initializer) => {

  const canvas = new ThreeCanvas(el, options);

  debug('threeCanvas', canvas);

  const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 10000);
  camera.position.z = 500;
  camera.position.y = 100;
  camera.lookAt(0, 0, 0);

  const scene = new THREE.Scene();

  scene.add(makeWireframe(new THREE.BoxBufferGeometry(100, 100, 100), 0xffffff));

  await initializer({ canvas, camera, scene });

  const yAxis = new THREE.Vector3(0, 1, 0);

  canvas.addEventListener('frame', ({ renderer, width, height, deltaTime }) => {

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    scene.rotateOnAxis(yAxis, deltaTime * 0.5);

    renderer.render(scene, camera);

  });

  canvas.start();
};
