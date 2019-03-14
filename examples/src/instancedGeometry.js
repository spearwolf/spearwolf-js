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
  hexCol2rgba,
  sample,
} from '../../src';

const init = async ({ scene }) => {

  // ----------------------------------------------------------------------------------
  //
  // create lights
  //
  // ----------------------------------------------------------------------------------

  const ambientLight = new THREE.AmbientLight(0x79b3ce);
  scene.add(ambientLight);

  const hemisphereLight = new THREE.HemisphereLight(0x79b3ce, 0xd6d6ba, 1);
  scene.add(hemisphereLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(-8, 5, 1);
  scene.add(directionalLight);

  // ----------------------------------------------------------------------------------
  //
  // create vertex object descriptor
  //
  // ----------------------------------------------------------------------------------

  const vod = new VODescriptor({

    attributes: {

      move: ['tx', 'ty', 'tz'],

      tint: { type: 'uint8', scalars: ['r', 'g', 'b', 'a'] },

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
  // create base geometry
  //
  // ----------------------------------------------------------------------------------

  const baseGeometry = new THREE.SphereBufferGeometry(13, 10, 10);

  const material = new THREE.MeshLambertMaterial({
    color: 0x999999,
  });

  // @ts-ignore
  material.onBeforeCompile = (shader) => {

    // #include <color_vertex>
    //    vColor.xyz = color.xyz;

    // shader.vertexShader = `
    //   attribute vec3 tint;
    //   ${shader.vertexShader}
    // `;

    shader.vertexShader = shader.vertexShader.replace(
      '#include <color_vertex>',
      `
        #ifdef USE_COLOR
          vColor.xyz = vec3( 0.3, 0.8, 0.0 );
        #endif
      `,
    );
    // vColor.xyz = vec3( 255.0 / tint.x, 255.0 / tint.y, 255.0 / tint.z );

    // #include <begin_vertex>
    //    vec3 transformed = vec3( position );

    shader.vertexShader = `
      attribute vec3 move;
      ${shader.vertexShader}
    `;

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      'vec3 transformed = vec3( position + move );',
    );

  };

  // ----------------------------------------------------------------------------------
  //
  // create some instanced sprites
  //
  // ----------------------------------------------------------------------------------

  const COLORS = [
    '3ec1d3',
    'f6f7d7',
    'ff9a00',
    'ff165d',
  ];

  makeCircleCoords(100, 800).forEach(([x, y]) => {
    const sprite = spriteGroup.createSprite();
    sprite.setMove(x, y, 0);
    sprite.setTint(...hexCol2rgba(sample(COLORS), 180));
  });

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
