import * as THREE from 'three';

import { findNextPowerOf2 } from '../../src';

import { appendTo } from './appendTo.js';

const println = appendTo('#output', '\n');

println(`spearwolf.findNextPowerOf2(23): ${findNextPowerOf2(23)}`);
println(`THREE REVISION ${THREE.REVISION}`);
