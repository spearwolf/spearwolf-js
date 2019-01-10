import * as THREE from 'three';

import { appendTo } from './appendTo.js';

const println = appendTo('#output', '\n');

import('../src/index.js').then(({ foo }) => {
  println(foo(42));
  println(`THREE REVISION ${THREE.REVISION}`);
});
