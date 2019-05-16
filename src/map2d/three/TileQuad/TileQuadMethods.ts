import { TileQuad } from './TileQuad';

export const TileQuadMethods = {

  setTexCoordsByTexture(this: TileQuad, { minS, minT, maxS, maxT }: { minS: number, minT: number, maxS: number, maxT: number }) {
    this.setTex(minS, minT, maxS - minS, maxT - minT);
  },

  setSize(this: TileQuad, w: number, h: number) {
    this.width0 = w;
    this.height0 = h;
  },

  translate(this: TileQuad, left: number, bottom: number, yPos: number) {
    this.left0 = left;
    this.bottom0 = bottom;
    this.yPos0 = yPos;
  },

};

export type TileQuadMethodsType = typeof TileQuadMethods;
