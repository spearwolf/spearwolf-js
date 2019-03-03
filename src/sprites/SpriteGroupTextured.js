import { SpriteGroup } from './SpriteGroup';

/**
 * @typedef {import("./SpriteGroup").SpriteSizeSetter} SpriteSizeSetter
 * @typedef {import("./VODescriptor").VODescriptor} VODescriptor
 * @typedef {import("./VOArray").VOArray} VOArray
 * @typedef {import("./VOIndices").VOIndices} VOIndices
 * @typedef {import("../textures").Texture} Texture
 * @typedef {(sprite: Object, texture: Texture) => void} SpriteTexCoordsSetter
 */

 /**
  * @type SpriteTexCoordsSetter
  */
const SPRITE_TEX_COORDS_SETTER = (sprite, texture) => sprite.setTexCoordsByTexture(texture);

export class SpriteGroupTextured extends SpriteGroup {

  /**
   * @param {VODescriptor} descriptor - The `VODescriptor` (*vertex object description*)
   * @param {Object} options - Options
   * @param {number} [options.capacity] - Maximum number of *sprites*
   * @param {VOArray} [options.voArray] - A predefined *vertex object array*, otherwise a new one will be created
   * @param {VOIndices|Function} [options.voIndices] - *vertex object indices* array or factory function
   * @param {Object|Function} [options.voZero] - *vertex object* initializer
   * @param {Object|Function} [options.voNew] - *vertex object* initializer
   * @param {string|SpriteSizeSetter} [options.setSize='size'] - A callback function that takes three arguments (sprite, width, height) and sets the size of sprite (called by `.createSprite(w, h)`). Or you can specify the *name* of the size attribute (should be a 2d vector unform).
   * @param {SpriteTexCoordsSetter} [options.setTexCoordsByTexture] - A callback function that takes two arguments (sprite, texture) and sets the tex-coords of the sprite
   * @param {number} [options.maxAllocVOSize] - Never allocate more than `maxAllocVOSize` *sprites* at once
   * @param {boolean} [options.dynamic=true] - Buffer usage hint
   * @param {boolean} [options.autotouch] - auto touch vertex buffers hint, set to `true` (which is the default if buffer usagee is dynamic) or `false`.
   * @param {SpriteGroupTextured|Object} [options.base] - The *base sprite group instance* or the *base sprite group options*
   */
  constructor(descriptor, options = {}) {
    super(descriptor, options);

    /**
     * @type {SpriteTexCoordsSetter}
     */
    this.setTexCoordsByTexture = (options.setTexCoordsByTexture || null) || SPRITE_TEX_COORDS_SETTER;
  }

  /**
   * Create a sprite.
   * @param {Texture} [texture]
   * @param {number} [width]
   * @param {number} [height=width]
   * @returns {Object} sprite
   */
  createSpriteByTexture(texture, width, height) {
    let w;
    let h;
    if (texture != null && width === undefined) {
      w = texture.width;
      h = texture.height;
    } else {
      w = width;
      h = height;
    }

    const sprite = this.createSprite(w, h);

    const { setTexCoordsByTexture } = this;
    if (texture && setTexCoordsByTexture) {
      setTexCoordsByTexture(sprite, texture);
    }

    return sprite;
  }

}
