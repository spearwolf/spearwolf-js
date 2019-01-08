import * as THREE from 'three';

import { appendTo } from './appendTo.js';

const println = appendTo('#output', '\n');

import('../index.js').then(({ foo }) => {
  println(foo(23));
  println(`THREE REVISION ${THREE.REVISION}`);
});
