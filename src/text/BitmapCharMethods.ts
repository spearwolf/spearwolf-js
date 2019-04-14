import { IBitmapChar } from "./IBitmapChar";

export const BitmapCharMethods = {

  setTexCoordsByTexture(this: IBitmapChar, { minS, minT, maxS, maxT }: { minS: number, minT: number, maxS: number, maxT: number }) {
    this.setTex(minS, minT, maxS - minS, maxT - minT);
  },

  setSize(this: IBitmapChar, w: number, h: number) {
    this.width0 = w;
    this.height0 = h;
  },

  translate(this: IBitmapChar, x: number, y: number, z: number) {
    this.originX0 = x;
    this.originY0 = y;
    this.zPos0 = z;
  },

};

export type BitmapCharMethodsType = typeof BitmapCharMethods;
