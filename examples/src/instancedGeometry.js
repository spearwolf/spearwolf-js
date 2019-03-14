/* eslint-disable no-console */
/* eslint-env browser */
import * as THREE from 'three';

import { makeAppShell } from './utils/makeAppShell';
import { debug } from './utils/debug';

import {
  makeCircleCoords,
  SpriteGroup,
  SpriteGroupInstancedBufferGeometry,
  SpriteGroupMesh,
  VODescriptor,
  hexCol2rgb,
  sample,
} from '../../src';

const init = async ({ canvas, scene }) => {

  // ----------------------------------------------------------------------------------
  //
  // create lights
  //
  // ----------------------------------------------------------------------------------

  const ambientLight = new THREE.AmbientLight(0xf0f0c0);
  scene.add(ambientLight);

  const hemisphereLight = new THREE.HemisphereLight(0xf0f0f0, 0xffffff, 1);
  scene.add(hemisphereLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 0, 10);
  scene.add(directionalLight);

  // ----------------------------------------------------------------------------------
  //
  // create vertex object descriptor
  //
  // ----------------------------------------------------------------------------------

  const vod = new VODescriptor({

    attributes: {

      move: ['x', 'y', 'z'],

      tint: { type: 'uint8', scalars: ['r', 'g', 'b'] },

    },

    methods: {

      setColor(color) {
        const colors = hexCol2rgb(color);
        this.setTint(...colors);
      }

    },

  });

  // ----------------------------------------------------------------------------------
  //
  // create sprite groups
  //
  // ----------------------------------------------------------------------------------

  const spriteGroup = new SpriteGroup(vod, {

    capacity: 1000,
    maxAllocVOSize: 100,

    dynamic: false,

  });

  // ----------------------------------------------------------------------------------
  //
  // create some sprites
  //
  // ----------------------------------------------------------------------------------

  const COLORS = [
    'b7fbff',
    'fff6be',
    'ffe0a3',
    'ffa1ac',
  ];

  makeCircleCoords(100, 650, (x, y, z) => {
    const sprite = spriteGroup.createSprite();
    sprite.setMove(x, y, z);
    sprite.setColor(sample(COLORS));
  });

  // ----------------------------------------------------------------------------------
  //
  // create some custom uniforms
  //
  // ----------------------------------------------------------------------------------

  const timeUniform = { value: 0.0 };

  canvas.addEventListener('frame', ({ now }) => {

    timeUniform.value = now % Math.PI * 2;

  });

  // ----------------------------------------------------------------------------------
  //
  // create base geometry
  //
  // ----------------------------------------------------------------------------------

  const baseGeometry = new THREE.SphereBufferGeometry(13, 10, 10);

  const material = new THREE.MeshLambertMaterial();

  // @ts-ignore
  material.onBeforeCompile = (shader) => {

    shader.uniforms.time = timeUniform;

    shader.vertexShader = `
      attribute vec3 move;
      attribute vec3 tint;

      uniform float time;

      varying vec3 vTint;
      ${shader.vertexShader}
    `;

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
        vec3 transformed = vec3( position + vec3( move.xy, 150.0 * cos(time + ( move.z * ${Math.PI * 4}) ) - 75.0) );

        vTint = tint / 255.0;
      `,
    );

    shader.fragmentShader = `
      varying vec3 vTint;
      ${shader.fragmentShader}
    `;

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <dithering_fragment>',
      `
        gl_FragColor.rgb *= vTint;
        #include <dithering_fragment>
      `,
    );

  };

  // ----------------------------------------------------------------------------------
  //
  // add sprites to scene
  //
  // ----------------------------------------------------------------------------------

  const geometry = new SpriteGroupInstancedBufferGeometry(baseGeometry, spriteGroup);
  const mesh = new SpriteGroupMesh(geometry, material);

  scene.add(mesh);

  debug('spriteGroup', spriteGroup);
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
