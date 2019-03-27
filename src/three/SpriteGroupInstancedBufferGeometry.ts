import * as THREE from 'three';

import { SpriteGroup } from '../sprites';

import { createBufferAttributes } from './createBufferAttributes';

export class SpriteGroupInstancedBufferGeometry<T, K> extends THREE.InstancedBufferGeometry {

  /**
   * Initial parameters at creation time
   */
  readonly parameters: {
    spriteGroup: SpriteGroup<T>;
    baseSpriteGroup?: SpriteGroup<K>;
  };

  private readonly _buffers: THREE.InterleavedBuffer[];
  private readonly _instancedBuffers: THREE.InstancedInterleavedBuffer[];

  constructor(base: SpriteGroup<K> | THREE.BufferGeometry, spriteGroup: SpriteGroup<T>) {
    super();

    this.type = 'spearwolf.SpriteGroupInstancedBufferGeometry';

    this.parameters = { spriteGroup };

    if ((base as SpriteGroup<K>).isSpriteGroup) {

      const baseSpriteGroup = base as SpriteGroup<K>;

      this.parameters.baseSpriteGroup = baseSpriteGroup;

      this.setIndex(baseSpriteGroup.indices.indices);

      this._buffers = createBufferAttributes(baseSpriteGroup, this, (typedArray, stride) => new THREE.InterleavedBuffer(typedArray, stride));

      baseSpriteGroup.voPool.voArray.ref.serial = this.bufferVersion;

    } else if ((base as any).isBufferGeometry) {

      this.copy(base as THREE.BufferGeometry);

    }

    this._instancedBuffers = createBufferAttributes(spriteGroup, this, (typedArray, stride) => new THREE.InstancedInterleavedBuffer(typedArray, stride, 1));

    spriteGroup.voPool.voArray.ref.serial = this.instancedBufferVersion;
  }

  get maxInstancedCount() {
    return this.parameters.spriteGroup.usedCount;
  }

  set maxInstancedCount(_x) {
    // ignore
  }

  updateBuffers() {
    this._buffers.forEach((buf) => {
      buf.needsUpdate = true;
    });
  }

  updateInstancedBuffers() {
    this._instancedBuffers.forEach((buf) => {
      buf.needsUpdate = true;
    });
  }

  get bufferVersion() {
    return this._buffers[0].version;
  }

  get instancedBufferVersion() {
    return this._instancedBuffers[0].version;
  }

}
