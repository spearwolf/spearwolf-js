/* eslint-disable no-console */
/* eslint-env browser */
import { makeAppShell } from './utils/makeAppShell';
import { makeTexture } from './utils/makeTexture';
import { debug } from './utils/debug';

import {
  BitmapCharGroup,
  BitmapFontMaterial,
  SpriteGroupBufferGeometry,
  SpriteGroupMesh,
  TextureAtlas,
} from '../../src';

const init = async ({ canvas, scene }) => {

  // ----------------------------------------------------------------------------------
  //
  // create sprite group for bitmap chars
  //
  // ----------------------------------------------------------------------------------

  const bitmapChars = new BitmapCharGroup({ capacity: 1000 });

  // ----------------------------------------------------------------------------------
  //
  // load texture atlas
  //
  // ----------------------------------------------------------------------------------

  const atlas = await TextureAtlas.load('nobinger.json', '/assets/');

  // ----------------------------------------------------------------------------------
  //
  // create some sprites
  //
  // ----------------------------------------------------------------------------------

  const COUNT = 40;
  const STEP_X = 60;
  const LAYERS = 11;
  const STEP_Z = 100;

  for (let z = -0.5 * LAYERS * STEP_Z, j = 0; j < LAYERS; j++, z+= STEP_Z) {
    for (let x = -0.5 * COUNT * STEP_X, i = 0; i < COUNT; i++, x+= STEP_X) {

      bitmapChars.createSpriteByTexture(atlas.randomFrame()).translate(x, 0, z);

    }
  }

  // ----------------------------------------------------------------------------------
  //
  // create shader material
  //
  // ----------------------------------------------------------------------------------

  const anisotrophy = canvas.renderer.capabilities.getMaxAnisotropy();

  console.log('max anisotrophy =', anisotrophy);

  const material = new BitmapFontMaterial(makeTexture(atlas.baseTexture.imgEl, anisotrophy));

  canvas.addEventListener('frame', ({ now }) => {

    material.uniforms.time.value = 0.5 * now % Math.PI * 2;

  });

  // ----------------------------------------------------------------------------------
  //
  // add sprites to scene
  //
  // ----------------------------------------------------------------------------------

  const mesh = new SpriteGroupMesh(new SpriteGroupBufferGeometry(bitmapChars), material);

  scene.add(mesh);

  debug('spriteGroup', bitmapChars);
  debug('material', material);

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
