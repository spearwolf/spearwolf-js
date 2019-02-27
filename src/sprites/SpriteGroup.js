import { pick } from '../utils';

import { VOPool } from './VOPool';

/**
 * @private
 */
const pickVOPoolOpts = pick(['autotouch', 'capacity', 'doubleBuffer', 'maxAllocVOSize', 'usage', 'voArray']);

/**
 * @private
 */
const createSpriteSizeHook = (setSize = 'size') => {
  switch (typeof setSize) {
    case 'string':
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
 * @param {VODescriptor} descriptor - The `VODescriptor` (*vertex object description*)
 * @param {Object} options - Options
 * @param {number} [options.capacity] - Maximum number of *sprites*
 * @param {VOArray} [options.voArray] - A predefined *vertex object array*, otherwise a new one will be created
 * @param {VOIndices|Function} [options.voIndices] - *vertex object indices* array or factory function
 * @param {Object|function} [options.voZero] - *vertex object* initializer
 * @param {Object|function} [options.voNew] - *vertex object* initializer
 * @param {function|string} [options.setSize='size'] - A callback function that takes three arguments (sprite, width, height) and sets the size of sprite (called by `.createSprite(w, h)`). Or you can specify the *name* of the size attribute (should be a 2d vector unform).
 * @param {number} [options.maxAllocVOSize] - Never allocate more than `maxAllocVOSize` *sprites* at once
 * @param {string} [options.usage='dynamic'] - Buffer usage hint, choose between `dynamic` or `static`
 * @param {boolean} [options.doubleBuffer] - buffer `doubleBuffer` hint, set to `true` (which is the default if `usage` equals to `dynamic`) or `false`
 * @param {boolean} [options.autotouch] - auto touch vertex buffers hint, set to `true` (which is the default if `usage` equals to `dynamic`) or `false`.
 * @param {SpriteGroup|Object} [options.base] - The *base sprite group instance* or the *base sprite group options*
 */
export class SpriteGroup {

  constructor(descriptor, options = {}) {
    this.descriptor = descriptor;

    // if (options.base instanceof SpriteGroup) {
    //   this.base = options.base;
    // } else if (typeof options.base === 'object') {
    //   this.base = new SpriteGroup(descriptor.base, options.base);
    // }

    this.setSpriteSize = createSpriteSizeHook(options.setSize);

    const { voNew, voZero } = options;

    this.voPool = new VOPool(descriptor, Object.assign({
      maxAllocVOSize: 1000,
    }, pickVOPoolOpts(options), {
      voNew: voNew && descriptor.createVO(null, voNew),
      voZero: voZero && descriptor.createVO(null, voZero),
    }));

    const { voIndices } = options;
    this.indices = typeof voIndices === 'function' ? voIndices(this.capacity) : voIndices;
  }

  get capacity() {
    return this.voPool.capacity;
  }

  get usedCount() {
    return this.voPool.usedCount;
  }

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
   * inform the internally used vertex buffers that content has changed
   * and should be uploaded to gpu before next usage.
   * you don't need to call this if you choosed `dynamic` as *usage* option.
   */
  touchVertexBuffers() {
    this.voPool.voArray.ref.touch();
  }
}
