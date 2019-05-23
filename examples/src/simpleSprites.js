/* eslint-disable no-console */
/* eslint-env browser */
import { makeExampleShell } from './utils/makeExampleShell';
import { makeTexture } from './utils/makeTexture';
import { debug } from './utils/debug';

import {
  TextureAtlas, SimpleSprites, SimpleSpritesMaterial,
} from '../../src';

const OFFSET_Y = .1;
const OFFSET_T = .15;
const SCALE_X = 1.3;
const SCALE_Y = 1;
const MAX_X = 100;
const MAX_Y = 100;

const animateSprites = (sprites, tStart) => {
  for (let i = 0, t = tStart; i < sprites.length; i++, t+= OFFSET_T) {
    const x = Math.sin(t * SCALE_X) * MAX_X;
    const y = Math.cos((t + OFFSET_Y) * SCALE_Y) * MAX_Y;
    sprites[i].translate(x, y, 0);
  }
};

const init = async ({ camera, scene, canvas }) => {

  camera.position.y = 200;
  camera.position.z = 0;
  camera.lookAt(0, 0, 0);

  const atlas = await TextureAtlas.load('amigaballs.json', '/assets/');
  const texture = makeTexture(atlas.baseTexture.imgEl);
  const material = new SimpleSpritesMaterial(texture);
  const mesh = new SimpleSprites(material, { capacity: 100, dynamic: true, autotouch: true });

  scene.add(mesh);

  debug('camera', camera);
  debug('mesh', mesh);

  const COUNT = 66;
  const FRAMES = atlas.frameNames().map(name => atlas.frame(name));

  const sprites = [];

  for (let i = 0; i < COUNT; i++) {
    sprites.push(mesh.sprites.createSpriteByTexture(FRAMES[i % FRAMES.length]));
  }

  animateSprites(sprites, 0);
  canvas.addEventListener('frame', ({ now }) => animateSprites(sprites, now));
};

// ----------------------------------------------------------------------------------
// startup
//
//
// ----------------------------------------------------------------------------------

makeExampleShell(
  document.getElementById('container'),
  {
    alpha: true,
    autoRotate: false,
    showCube: true,
  },
  init,
);
