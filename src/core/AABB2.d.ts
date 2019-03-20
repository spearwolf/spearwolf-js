
/**
 * Represents a 2D axis aligned boundary box.
 * Uses a right-handed coordinate system.
 */
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

  /**
   * @return {boolean} Return `true` if point is within
   */
  isInside(x: number, y: number): boolean;

  /**
   * @return {boolean} Return `true` if both overlap
   */
  isIntersecting(aabb: AABB2): boolean;

  isNorthWest(x: number, y: number): boolean;
  isNorthEast(x: number, y: number): boolean;
  isSouthEast(x: number, y: number): boolean;
  isSouthWest(x: number, y: number): boolean;
}
