
export class AABB2 {
  left: number;
  top: number;
  width: number;
  height: number;

  right: number;
  bottom: number;

  centerX: number;
  centerY: number;

  constructor(left: number, top: number, width: number, height: number);

  clone(): AABB2;

  isInside(x: number, y: number): boolean;

  isIntersecting(aabb: AABB2): boolean;

  isNorthWest(x: number, y: number): boolean;
  isNorthEast(x: number, y: number): boolean;
  isSouthEast(x: number, y: number): boolean;
  isSouthWest(x: number, y: number): boolean;
}
