
export interface IBitmapChar {

  zPos0: number;

  baselineOffset0: number;

  originX0: number;
  originY0: number;

  width0: number;
  height0: number;

  setPos: (oiginX: number, originY: number, width: number, height: number) => void;

  originS0: number;
  originT0: number;

  maxS0: number;
  maxT0: number;

  setTex: (oiginS: number, originT: number, maxS: number, maxT: number) => void;

}
