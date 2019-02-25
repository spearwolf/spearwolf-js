import initializeVO from './initializeVO';

/**
 * A base class for sprites.
 * Use it in conjunction with the [[VertexObject]] decorator.
 */
export class Sprite {

  /**
   * @param {Object} options
   * @param {VODescriptor} options.descriptor
   * @param {VOArray} [options.voArray]
   * @param {function|object} [options.initializer] - initializer
   */
  constructor({ descriptor, voArray, initializer }) {
    this.descriptor = descriptor;
    this.voArray = voArray;

    if (initializer) {
      initializeVO(this, initializer);
    }
  }

}
