import { ISimpleSprite } from './ISimpleSprite';

export const SimpleSpriteMethods = {

  setTexCoordsByTexture(this: ISimpleSprite, { minS, minT, maxS, maxT }: { minS: number, minT: number, maxS: number, maxT: number }) {
    this.setTex(minS, minT, maxS - minS, maxT - minT);
  },

  setSize(this: ISimpleSprite, w: number, h: number) {
    this.width = w;
    this.height = h;
  },

  translate(this: ISimpleSprite, left: number, bottom: number, yPos: number) {
    this.left = left;
    this.bottom = bottom;
    this.yPos = yPos;
  },

};

export type SimpleSpriteMethodsType = typeof SimpleSpriteMethods;
