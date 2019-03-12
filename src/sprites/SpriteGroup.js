import { pick } from '../utils';

import { VOPool } from './VOPool';

/**
 * @private
 */
const pickVOPoolOpts = pick(['autotouch', 'capacity', 'doubleBuffer', 'maxAllocVOSize', 'dynamic', 'voArray']);

/**
 * @private
 * @param {string|import('./SpriteGroup').SpriteSizeSetter} setSize
 * @returns {import('./SpriteGroup').SpriteSizeSetter}
 */
const createSpriteSizeHook = (setSize = 'size') => {
  switch (typeof setSize) {
    case 'string':
      // @ts-ignore
      return (sprite, w, h, descriptor) => descriptor.attr[setSize].setValue(sprite, [w, h]);
    case 'function':
      return setSize;

    case 'object':
    case 'boolean':
      if (!setSize) {
        return null;
      }
    default: // eslint-disable-line
      throw new Error(`[SpriteGroup] invalid sprite size setter! (is ${typeof setSize} but should be a function, string, null or false)`);
  }
};

/**
 * @typedef {import("./VODescriptor").VODescriptor} VODescriptor
 */

/**
 * @typedef {import("./VOArray").VOArray} VOArray
 */

/**
 * @typedef {import("./VOIndices").VOIndices} VOIndices
 */

export class SpriteGroup {

  /**
   * @param {VODescriptor} descriptor - The `VODescriptor` (*vertex object description*)
   * @param {Object} options - Options
   * @param {number} [options.capacity] - Maximum number of *sprites*
   * @param {VOArray} [options.voArray] - A predefined *vertex object array*, otherwise a new one will be created
   * @param {VOIndices|Function} [options.indices] - *vertex object indices* array or factory function
   * @param {Object|Function} [options.voZero] - *vertex object* initializer
   * @param {Object|Function} [options.voNew] - *vertex object* initializer
   * @param {string|import('./SpriteGroup').SpriteSizeSetter} [options.setSize='size'] - A callback function that takes three arguments (sprite, width, height) and sets the size of sprite (called by `.createSprite(w, h)`). Or you can specify the *name* of the size attribute (should be a 2d vector unform).
   * @param {number} [options.maxAllocVOSize] - Never allocate more than `maxAllocVOSize` *sprites* at once
   * @param {boolean} [options.dynamic=true] - Buffer usage hint
   * @param {boolean} [options.autotouch] - auto touch vertex buffers hint, set to `true` (which is the default if buffer usagee is dynamic) or `false`.
   * @param {SpriteGroup|Object} [options.base] - The *base sprite group instance* or the *base sprite group options*
   */
  constructor(descriptor, options = {}) {
    this.descriptor = descriptor;

    this.isSpriteGroup = true;

    /**
     * @type {import('./SpriteGroup').SpriteSizeSetter}
     */
    this.setSpriteSize = createSpriteSizeHook(options.setSize);

    const { voNew, voZero } = options;

    /**
     * @type {VOPool}
     */
    this.voPool = new VOPool(descriptor, Object.assign({
      maxAllocVOSize: 1000,
    }, pickVOPoolOpts(options), {
      voNew: voNew && descriptor.createVO(null, voNew),
      voZero: voZero && descriptor.createVO(null, voZero),
    }));

    const { indices } = options;
    /**
     * @type {VOIndices}
     */
    this.indices = typeof indices === 'function' ? indices(this.capacity) : indices;
  }

  /** @type {number} */
  get capacity() {
    return this.voPool.capacity;
  }

  /** @type {number} */
  get usedCount() {
    return this.voPool.usedCount;
  }

  /** @type {number} */
  get availableCount() {
    return this.voPool.availableCount;
  }

  /**
   * Create a sprite.
   * @param {number} [width]
   * @param {number} [height=width]
   * @returns {Object} sprite
   */
  createSprite(width, height) {
    const sprite = this.voPool.alloc();
    const { setSpriteSize } = this;
    if (setSpriteSize && (width !== undefined || height !== undefined)) {
      setSpriteSize(sprite, width, height !== undefined ? height : width, this.descriptor);
    }
    return sprite;
  }

  /**
   * Create multiple sprites at once.
   * @param {number} count - number of sprites to create
   * @param {number} [width]
   * @param {number} [height=width]
   * @returns {Array<Object>} sprites
   */
  createSprites(count, width, height) {
    const sprites = this.voPool.multiAlloc(count);
    const { setSpriteSize } = this;
    if (setSpriteSize && (width !== undefined || height !== undefined)) {
      const h = height !== undefined ? height : width;
      sprites.forEach(sprite => setSpriteSize(sprite, width, h, this.descriptor));
    }
    return sprites;
  }

  /**
   * Inform the internally used vertex buffers that content has changed
   * and should be uploaded to gpu before next usage.
   * you don't need to call this if you choosed `dynamic` as buffer usage hint.
   */
  touchVertexBuffers() {
    this.voPool.voArray.ref.touch();
  }
}
