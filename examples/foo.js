import * as THREE from 'three';

import appendTo from '../appendTo.js';

const println = appendTo('#output', '\n');

import('../Foo.js').then(({ default: foo }) => {
  println(foo(23));
  println(`THREE REVISION ${THREE.REVISION}`);
});