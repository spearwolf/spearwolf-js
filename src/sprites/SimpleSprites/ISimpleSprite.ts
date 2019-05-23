
export interface ISimpleSprite {

  yPos0: number;

  left0: number;
  bottom0: number;

  width0: number;
  height0: number;

  setPos: (left: number, bottom: number, width: number, height: number) => void;

  originS0: number;
  originT0: number;

  maxS0: number;
  maxT0: number;

  setTex: (oiginS: number, originT: number, maxS: number, maxT: number) => void;

}
