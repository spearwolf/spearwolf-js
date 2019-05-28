/* eslint-disable no-console */
/* eslint-env browser */
import { makeExampleShell } from './utils/makeExampleShell';
import { makeTexture } from './utils/makeTexture';

import {
  TextureAtlas, SimpleSprites, SimpleSpritesMaterial,
} from '../../src';

// const OFFSET_Y = .1;
// const OFFSET_T = -.095;
// const OFFSET_Z = 0.3;
// const SCALE_X = 0.7;
// const SCALE_Y = .32;
// const MAX_X = 300;
// const MAX_Y = 150;
const OFFSET_T = 0.066;
const OFFSET_Z = .5;

const animateSprites = (sprites, tStart) => {
  for (let i = 0, t = tStart * .5; i < sprites.length; i++, t+= OFFSET_T) {
    // const tx = Math.sin(t * 0.4) % 1;
    // const x = Math.cos(((i * 0.5) + tx) * 1.3) + Math.sin(t * SCALE_X) * MAX_X;
    // const ty = Math.cos(t + (i * .3)) - (t/2);
    // const y = (Math.cos((ty + OFFSET_Y) * SCALE_Y) + Math.sin(t)) * MAX_Y;
    // sprites[i].translate(x, y, i * OFFSET_Z);
    const u = Math.cos(t); // (t % 2) - 1;
    const v = Math.sin(t);
    const x = Math.sin(t) * 400 * u * u;
    const y = Math.cos(t) * 400 * v * v;
    sprites[i].translate(x, y, i * OFFSET_Z);
  }
};

const init = async ({ camera, scene, canvas }) => {

  camera.position.y = 400;
  camera.position.z = 50;
  camera.lookAt(0, 0, 0);

  const atlas = await TextureAtlas.load('amigaballs.json', '/assets/');
  const texture = makeTexture(atlas.baseTexture.imgEl);
  const material = new SimpleSpritesMaterial(texture);
  const mesh = new SimpleSprites(material, { capacity: 256, dynamic: true, autotouch: true });

  scene.add(mesh);

  const COUNT = mesh.sprites.capacity;
  const FRAMES = atlas.frameNames().map(name => atlas.frame(name));
  const FRAME_DELTA = FRAMES.length / COUNT;

  const sprites = [];

  for (let i = 0; i < COUNT; i++) {
    sprites.push(mesh.sprites.createSpriteByTexture(FRAMES[Math.floor(i * FRAME_DELTA + (FRAME_DELTA * 2 * Math.round(Math.random() * 2))) % FRAMES.length]));
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
    autoRotate: true,
    showCube: false,
  },
  init,
);
