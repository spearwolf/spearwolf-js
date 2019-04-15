import { BitmapChar } from './BitmapChar';

export const BitmapCharMethods = {

  setTexCoordsByTexture(this: BitmapChar, { minS, minT, maxS, maxT }: { minS: number, minT: number, maxS: number, maxT: number }) {
    this.setTex(minS, minT, maxS - minS, maxT - minT);
  },

  setSize(this: BitmapChar, w: number, h: number) {
    this.width0 = w;
    this.height0 = h;
  },

  translate(this: BitmapChar, x: number, y: number, z: number) {
    this.originX0 = x;
    this.originY0 = y;
    this.zPos0 = z;
  },

};

export type BitmapCharMethodsType = typeof BitmapCharMethods;
