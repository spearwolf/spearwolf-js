/* eslint-disable no-console */
/* eslint-env browser */
import { makeExampleShell } from './utils/makeExampleShell';
import { makeTexture } from './utils/makeTexture';

import { TextureAtlas, SimpleSprites, SimpleSpritesMaterial } from '../../src';

const OFFSET_T = 0.046;
const OFFSET_Z = .66;
const SIZE = 400;

const animateSprites = (sprites, tStart) => {
  for (let i = 0, t = tStart * .5; i < sprites.length; i++, t+= OFFSET_T) {
    const a = Math.sin(Math.sin(t * .5) + ((Math.sin(t) * 1.3)) * .25) + .25;
    const b = Math.cos(Math.cos(t * .25) + (Math.cos(t) * 2)) * .5;
    const x = Math.sin(t) * SIZE * a;
    const y = Math.cos(t) * SIZE * b;

    sprites[i].translate(x, y, i * OFFSET_Z);

  }
};

const init = async ({ camera, scene, canvas }) => {

  camera.position.y = 400;
  camera.position.z = 0;
  camera.lookAt(0, 0, 0);

  const atlas = await TextureAtlas.load('amigaballs.json', '/assets/');
  const texture = makeTexture(atlas.baseTexture.imgEl);
  const material = new SimpleSpritesMaterial(texture);
  const mesh = new SimpleSprites(material, { capacity: 256, dynamic: true, autotouch: true });

  scene.add(mesh);

  const COUNT = mesh.sprites.capacity;
  const FRAMES = atlas.frameNames().map(name => atlas.frame(name));
  const FRAMES_COUNT = FRAMES.length;

  const sprites = [];

  for (let i = 0; i < COUNT; i++) {
    sprites.push(mesh.sprites.createSpriteByTexture(FRAMES[Math.floor(Math.random() * FRAMES_COUNT)]));
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
