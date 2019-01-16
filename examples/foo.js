import * as THREE from 'three';

import { appendTo } from './appendTo.js';

const println = appendTo('#output', '\n');

import('../src/index.js').then(({ findNextPowerOf2 }) => {
  println(`spearwolf.findNextPowerOf2(23): ${findNextPowerOf2(23)}`);
  println(`THREE REVISION ${THREE.REVISION}`);
});
