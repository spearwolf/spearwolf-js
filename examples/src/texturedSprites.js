/* eslint-disable no-console */
/* eslint-env browser */
import * as THREE from 'three';

import { makeAppShell } from './utils/makeAppShell';
import { makeTexture } from './utils/makeTexture';
import { debug } from './utils/debug';

import { VODescriptor, VOIndices, SpriteGroupTextured, SpriteGroupBufferGeometry, SpriteGroupMesh, TextureAtlas } from '../../src';

function init ({ canvas, scene }) {

  // ----------------------------------------------------------------------------------
  //
  // create vertex object descriptor
  //
  // ----------------------------------------------------------------------------------

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

  // ----------------------------------------------------------------------------------
  //
  // create sprite group
  //
  // ----------------------------------------------------------------------------------

  const spriteGroup = new SpriteGroupTextured(quads, {

    capacity: 100,

    indices: VOIndices.buildQuads,

    dynamic: false,

    setSize: (sprite, w, h) => sprite.setSize(w, h),
    setTexCoordsByTexture: (sprite, texture) => sprite.setTexCoordsByTexture(texture),

  });

  // ----------------------------------------------------------------------------------
  //
  // create some custom uniforms
  //
  // ----------------------------------------------------------------------------------

  const timeUniform = { value: 0.0 };

  canvas.addEventListener('frame', ({ now }) => {

    timeUniform.value = 0.5 * now % Math.PI * 2;

  });

  // ----------------------------------------------------------------------------------
  //
  // load texture atlas
  //
  // ----------------------------------------------------------------------------------

  TextureAtlas.load('nobinger.json', '/assets/').then((atlas) => {

    // ----------------------------------------------------------------------------------
    //
    // create some sprites
    //
    // ----------------------------------------------------------------------------------

    const STEP_X = 60;
    const COUNT = 40;

    let x = -0.5 * COUNT * STEP_X;

    for (let i = 0; i < COUNT; i++) {
      spriteGroup.createSpriteByTexture(atlas.randomFrame()).translate(x, 0);
      x += STEP_X;
    }

    // ----------------------------------------------------------------------------------
    //
    // create custom shader material
    //
    // ----------------------------------------------------------------------------------

    const material = new THREE.ShaderMaterial( {

      vertexShader: `
        uniform float time;

        varying vec2 vTexCoords;

        void main(void)
        {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y + (150.0 * sin((3.0 * time) + (position.x / 300.0))), position.z, 1.0);
          vTexCoords = uv;
        }
      `,

      fragmentShader: `
        uniform sampler2D tex;

        varying vec2 vTexCoords;

        void main(void) {
          gl_FragColor = texture2D(tex, vec2(vTexCoords.s, vTexCoords.t));
        }
      `,

      uniforms: {
        time: timeUniform,
        tex: { value: makeTexture(atlas.baseTexture.imgEl) },
      },

      side: THREE.DoubleSide,
      transparent: true,

    });

    // ----------------------------------------------------------------------------------
    //
    // add sprites to scene
    //
    // ----------------------------------------------------------------------------------

    const spriteGroupGeometry = new SpriteGroupBufferGeometry(spriteGroup);
    const mesh = new SpriteGroupMesh(spriteGroupGeometry, material);

    scene.add(mesh);

    debug('material', material);
  });

}

// ----------------------------------------------------------------------------------
//
// start
//
// ----------------------------------------------------------------------------------

makeAppShell(
  document.getElementById('container'),
  {
    alpha: true,
  },
  init,
);
