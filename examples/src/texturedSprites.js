/* eslint-disable no-console */
/* eslint-env browser */
import * as THREE from 'three';

import { makeWireframe } from './utils/makeWireframe';
import { debug } from './utils/debug';

import { ThreeCanvas, VODescriptor, VOIndices, SpriteGroupTextured, SpriteGroupBufferGeometry, SpriteGroupMesh, TextureAtlas } from '../../src';

const threeCanvas = new ThreeCanvas(document.getElementById('container'), {
  alpha: true,
});

const camera = new THREE.PerspectiveCamera(75, threeCanvas.width / threeCanvas.height, 0.1, 10000);
camera.position.z = 500;
camera.position.y = 100;
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const quads = new VODescriptor({

  vertexCount: 4,

  attributes: {
    position: ['x', 'y', 'z'],
    uv: ['s', 't'],
  },

  methods: {

    translate(x, y) {
      this.x0 += x;
      this.x1 += x;
      this.x2 += x;
      this.x3 += x;
      this.y0 += y;
      this.y1 += y;
      this.y2 += y;
      this.y3 += y;
    },

    setTexCoordsByTexture({ minS, minT, maxS, maxT }) {
      this.setUv(minS, minT, maxS, minT, maxS, maxT, minS, maxT);
    },

    setSize(w, h) {
      const w2 = w / 2;
      const h2 = h / 2;

      this.setPosition(
        -w2, h2, 0,
        w2, h2, 0,
        w2, -h2, 0,
        -w2, -h2, 0,
      );
    },

  },
});

const spriteGroup = new SpriteGroupTextured(quads, {

  capacity: 100,

  indices: VOIndices.buildQuads,

  dynamic: false,

  setSize: (sprite, w, h) => sprite.setSize(w, h),
  setTexCoordsByTexture: (sprite, texture) => sprite.setTexCoordsByTexture(texture),

});

TextureAtlas.load('nobinger.json', '/assets/').then((atlas) => {
  const STEP_X = 60;
  const COUNT = 40;

  let x = -0.5 * COUNT * STEP_X;
  for (let i = 0; i < COUNT; i++) {
    spriteGroup.createSpriteByTexture(atlas.randomFrame()).translate(x, 0);
    x += STEP_X;
  }

  const texture = new THREE.Texture(atlas.baseTexture.imgEl);
  texture.flipY = false;
  texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;

  const spriteGroupGeometry = new SpriteGroupBufferGeometry(spriteGroup);

  const mesh = new SpriteGroupMesh(spriteGroupGeometry, new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    transparent: true,
  }));

  scene.add(mesh);

  debug('spriteGroupGeometry', spriteGroupGeometry);
  debug('mesh', mesh);
});

scene.add(makeWireframe(new THREE.BoxBufferGeometry(100, 100, 100), 0xffffff));

const yAxis = new THREE.Vector3(0, 1, 0);

threeCanvas.addEventListener('frame', ({ renderer, width, height, deltaTime }) => {

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  scene.rotateOnAxis(yAxis, deltaTime * 0.5);

  renderer.render(scene, camera);

});

threeCanvas.start();

debug('threeCanvas', threeCanvas);
debug('triangleDescriptor', quads);
debug('spriteGroup', spriteGroup);
