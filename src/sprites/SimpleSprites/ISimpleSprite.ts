
export interface ISimpleSprite {

  yPos: number;

  left: number;
  bottom: number;

  width: number;
  height: number;

  setPos: (left: number, bottom: number, width: number, height: number) => void;

  originS: number;
  originT: number;

  maxS: number;
  maxT: number;

  setTex: (oiginS: number, originT: number, maxS: number, maxT: number) => void;

}
