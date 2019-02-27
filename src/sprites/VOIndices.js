
/**
 * Element indices array and description
 */
export class VOIndices {

  /**
   * @param {number} objectCount
   * @param {number[]} indices
   * @param {number} stride
   * @param {number} [objectOffset=0]
   * @return {VOIndices}
   * @example
   * // Create indices for 10x quads where each quad made up of 2x triangles (4x vertices and 6x indices)
   * const quadIndices = VOIndices.build(10, [0, 1, 2, 0, 2, 3], 4)
   * quadIndices.length        // => 60
   * quadIndices.itemCount     // => 6
   */
  static build(objectCount, indices, stride, objectOffset = 0) {
    const arr = new VOIndices(objectCount, indices.length);

    for (let i = 0; i < objectCount; ++i) {
      for (let j = 0; j < indices.length; ++j) {
        arr.indices[(i * arr.itemCount) + j] = indices[j] + ((i + objectOffset) * stride);
      }
    }
    return arr;
  }

  /**
   * @param {number} count
   * @returns {VOIndices}
   */
  static buildQuads(count) {
    return VOIndices.build(count, [0, 1, 2, 0, 2, 3], 4);
  }

  /**
   * @param {number} count
   * @returns {VOIndices}
   */
  static buildTriangles(count) {
    return VOIndices.build(count, [0, 1, 2], 3);
  }

  /**
   * @param {number} objectCount
   * @param {number} itemCount
   */
  constructor(objectCount, itemCount) {
    this.objectCount = objectCount;
    this.itemCount = itemCount;
    this.length = objectCount * itemCount;
    this.indices = new Array(this.length);
  }

}
