/* eslint-disable no-console */
/* eslint-env browser */
import { makeAppShell } from './utils/makeAppShell';
import { debug } from './utils/debug';

import {
  TextureAtlas,
  BitmapText2D,
} from '../../src';

const init = async ({ canvas, scene }) => {

  const anisotrophy = canvas.renderer.capabilities.getMaxAnisotropy();

  console.log('max anisotrophy =', anisotrophy);

  const text2d = new BitmapText2D(
    await TextureAtlas.load('rbmfs.json', '/assets/rbmfs/'), {
      anisotrophy,
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
  const STEP_Z = 20;

  for (let z = -0.5 * LAYERS * STEP_Z, j = 0; j < LAYERS; j++, z+= STEP_Z) {
    for (let x = -0.5 * COUNT * STEP_X, i = 0; i < COUNT; i++, x+= STEP_X) {

      text2d.bitmapChars.createSpriteByTexture(text2d.fontAtlas.randomFrame()).translate(x, 0, z);

    }
  }

  canvas.addEventListener('frame', ({ now }) => {

    text2d.material.uniforms.time.value = 0.5 * now % Math.PI * 2;

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
  },
  init,
);
