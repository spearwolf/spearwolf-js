import { IBitmapChar } from "./IBitmapChar";

export const BitmapCharMethods = {

  translate(this: IBitmapChar, x: number, y: number, z: number) {
    this.x0 += x;
    this.x1 += x;
    this.x2 += x;
    this.x3 += x;
    this.y0 += y;
    this.y1 += y;
    this.y2 += y;
    this.y3 += y;
    this.z0 += z;
    this.z1 += z;
    this.z2 += z;
    this.z3 += z;
  },

  setTexCoordsByTexture(this: IBitmapChar, { minS, minT, maxS, maxT }: { minS: number, minT: number, maxS: number, maxT: number }) {
    this.setUv(minS, minT, maxS, minT, maxS, maxT, minS, maxT);
  },

  setSize(this: IBitmapChar, w: number, h: number) {
    const w2 = w / 2;
    const h2 = h / 2;

    this.setPosition(
      -w2, h2, 0,
      w2, h2, 0,
      w2, -h2, 0,
      -w2, -h2, 0,
    );
  },

};

export type BitmapCharMethodsType = typeof BitmapCharMethods;
