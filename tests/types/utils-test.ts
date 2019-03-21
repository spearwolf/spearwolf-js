import {
  findNextPowerOf2,
  get,
  hexCol2rgb,
  hexCol2rgba,
  isPowerOf2,
  makeCircleCoords,
  maxOf,
  pick,
  sample,
  toFloatColors,
  generateUuid,
} from 'spearwolf-js';

let x: number;
let y: boolean;

x = findNextPowerOf2(23);
y = isPowerOf2(66);

x = get<number>({ foo: { bar: 666 }}, 'foo/bar');
y = get<boolean>({ foo: { bar: true }}, 'foo/bar');

let r: number, g: number, b: number, a: number;

[r, g, b] = hexCol2rgb('ff0032');
[r, g, b, a] = hexCol2rgba('ff0032');
[r, g, b, a] = hexCol2rgba('ff0032', 128);

let coords: Array<[number, number, number]>;

coords = makeCircleCoords(100);
coords = makeCircleCoords(100, 2);

x = maxOf(1, 1);

let o = {
  foo: {
    bar: 1,
  },
  plah: 666,
}

interface Plah {
  plah: number;
}

const pickPlah = pick<Plah>(['plah']);
const p: Plah = pickPlah(o);

x = sample<number>([1, 2, 3, 4]);

[r, g, b] = toFloatColors([r, g, b]);
[r, g, b, a] = toFloatColors([r, g, b, a]);

const s: string = generateUuid();
