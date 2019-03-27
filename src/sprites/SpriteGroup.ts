import { pick } from '../utils';

import { VOPool } from './VOPool';
import { VODescriptor, VertexObject } from './VODescriptor';
import { VOArray } from './VOArray';
import { VOIndices } from './VOIndices';

export type SpriteSizeSetter = (sprite: Object, w: number, h: number, descriptor: any) => void;

const pickVOPoolOpts = pick([
  'autotouch',
  'capacity',
  'doubleBuffer',
  'maxAllocVOSize',
  'dynamic',
  'voArray',
]);

function createSpriteSizeHook (setSize: string | SpriteSizeSetter = 'size'): SpriteSizeSetter {
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

    default:
      throw new Error(`[SpriteGroup] invalid sprite size setter! (is ${typeof setSize} but should be a function, string, null or false)`);
  }
};

type VOIndicesFactoryFn = (capacity: number) => VOIndices;

export interface SpriteGroupOptions<T> {

  /**
   * Maximum number of vertex objects
   */
  capacity?: number;

  /**
   * Use your own [[VOArray]] instead of creating a new one
   */
  voArray?: VOArray;

  indices?: VOIndices | VOIndicesFactoryFn;

  /**
   * Blueprint for reserved (allocated but unused) vertex objects. See [[VOArray]].
   */
  voZero?: VertexObject<T>;

  /**
   * Blueprint for new vertex objects. See [[VOArray]].
   */
  voNew?: VertexObject<T>;

  /**
   * A callback function that takes three arguments (sprite, width, height) and sets the size of sprite (called by `.createSprite(w, h)`).
   * As an alternative you can specify the *name* of the *size* attribute for the vertex objects (should be a 2d vector uniform).
   * Default is `setSize`.
   * This function is called every time a new sprite is created.
   * See [[SpriteGroup#createSprite]]
   */
  setSize?: string | SpriteSizeSetter;

  /**
   * See [[VOArray]]
   */
  maxAllocVOSize?: number;

  /**
   * Buffer usage hint.
   * See [[VOArray]]
   */
  dynamic?: boolean;

  /**
   * Buffer usage hint.
   * See [[VOArray]]
   */
  autotouch?: boolean;

}

export class SpriteGroup<T> {

  readonly descriptor: VODescriptor<T>;

  readonly isSpriteGroup = true;

  setSpriteSize: SpriteSizeSetter;

  readonly voPool: VOPool<T>;
  readonly indices: VOIndices;

  constructor(descriptor: VODescriptor<T>, options: SpriteGroupOptions<T> = {}) {

    this.descriptor = descriptor;

    this.isSpriteGroup = true;

    this.setSpriteSize = createSpriteSizeHook(options.setSize);

    const { voNew, voZero } = options;

    this.voPool = new VOPool(descriptor, Object.assign({
      maxAllocVOSize: 1000,
    }, pickVOPoolOpts(options), {
      voNew: voNew && descriptor.createVO(null, voNew),
      voZero: voZero && descriptor.createVO(null, voZero),
    }));

    const { indices } = options;
    this.indices = typeof indices === 'function' ? indices(this.capacity) : indices;

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

  createSprite(width?: number, height?: number) {
    const sprite = this.voPool.alloc();
    const { setSpriteSize } = this;
    if (setSpriteSize && (width !== undefined || height !== undefined)) {
      setSpriteSize(sprite, width, height !== undefined ? height : width, this.descriptor);
    }
    return sprite;
  }

  /**
   * Create multiple sprites at once
   */
  createSprites(count: number, width?: number, height?: number) {
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
