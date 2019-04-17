/* eslint-disable no-console */
/* eslint-env browser */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { makeWireframe } from './makeWireframe';
import { debug } from './debug';

import { ThreeCanvas, readOption } from '../../../src';

export const makeExampleShell = async (el, options, initializer) => {

  const canvas = new ThreeCanvas(el, options);

  debug('threeCanvas', canvas);

  const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 10000);
  camera.position.z = 500;
  camera.position.y = 300;
  camera.lookAt(0, 0, 0);

  const scene = new THREE.Scene();

  if (readOption(options, 'showCube', true)) {

    scene.add(makeWireframe(new THREE.BoxBufferGeometry(100, 100, 100), 0xffffff));

  }

  const orbit = new OrbitControls(camera, canvas.renderer.domElement);

  orbit.screenSpacePanning = true;

  orbit.enableDamping = true;
  orbit.dampingFactor = 0.25;

  // @ts-ignore
  orbit.autoRotate = readOption(options, 'autoRotate', true);
  orbit.autoRotateSpeed = 0.25;

  await initializer({ canvas, camera, scene, orbit });

  canvas.addEventListener('frame', ({ renderer, width, height }) => {

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    orbit.update();

    renderer.render(scene, camera);

  });

  canvas.start();
};
