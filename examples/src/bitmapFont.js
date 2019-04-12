/* eslint-disable no-console */
/* eslint-env browser */
import { makeAppShell } from './utils/makeAppShell';
import { debug } from './utils/debug';

import {
  TextureAtlas,
  BitmapText2D,
} from '../../src';

const init = async ({ canvas, scene, camera }) => {

  camera.position.y = 0;
  camera.position.z = 300;
  camera.lookAt(0, 0, 0);

  const text2d = new BitmapText2D(
    await TextureAtlas.load('rbmfs.json', '/assets/rbmfs/'), {
      capacity: 1000,
    });

  // ----------------------------------------------------------------------------------
  //
  // create some sprites and animations
  //
  // ----------------------------------------------------------------------------------

  const COUNT = 40;
  const STEP_X = 10;
  const LAYERS = 11;
  const STEP_Z = 30;

  for (let z = -0.5 * LAYERS * STEP_Z, j = 0; j < LAYERS; j++, z+= STEP_Z) {
    for (let x = -0.5 * COUNT * STEP_X, i = 0; i < COUNT; i++, x+= STEP_X) {

      text2d.bitmapChars.createSpriteByTexture(text2d.fontAtlas.randomFrame()).translate(x, 0, z);

    }
  }

  canvas.addEventListener('frame', ({ now }) => {

    text2d.material.uniforms.time.value = 0.125 * now % Math.PI * 2;

  });

  // ----------------------------------------------------------------------------------
  //
  // add to scene
  //
  // ----------------------------------------------------------------------------------

  scene.add(text2d);

  debug('text2d', text2d);

};

// ----------------------------------------------------------------------------------
//
// startup
//
// ----------------------------------------------------------------------------------

makeAppShell(
  document.getElementById('container'),
  {
    alpha: true,
    autoRotate: false,
    showCube: false,
  },
  init,
);
