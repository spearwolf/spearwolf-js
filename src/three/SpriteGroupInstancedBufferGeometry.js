import * as THREE from 'three';

import { createAttributes } from './createAttributes';

/** @typedef {import('../sprites').SpriteGroup} SpriteGroup */

export class SpriteGroupInstancedBufferGeometry extends THREE.InstancedBufferGeometry {

  /**
   * @param {SpriteGroup|THREE.BufferGeometry} base
   * @param {SpriteGroup} spriteGroup
   */
  constructor(base, spriteGroup) {
    super();

    this.type = 'spearwolf.SpriteGroupInstancedBufferGeometry';

    if (base.isSpriteGroup) {

      this.parameters = {
        baseSpriteGroup: base,
        spriteGroup,
      };

      this.setIndex(base.indices.indices);

      /**
       * @private
       * @type {THREE.InterleavedBuffer[]}
       */
      this._buffers = createAttributes(base, this, (typedArray, stride) => new THREE.InterleavedBuffer(typedArray, stride));

      base.voPool.voArray.ref.serial = this.bufferVersion;

    } else if (base.isBufferGeometry) {

      this.copy(base);

    }

    /**
     * @private
     * @type {THREE.InstancedInterleavedBuffer[]}
     */
    this._instancedBuffers = createAttributes(spriteGroup, this, (typedArray, stride) => new THREE.InstancedInterleavedBuffer(typedArray, stride, 1));

    spriteGroup.voPool.voArray.ref.serial = this.instancedBufferVersion;
  }

  get maxInstancedCount() {
    return this.parameters.spriteGroup.usedCount;
  }

  set maxInstancedCount(x) {
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

  /**
   * @type {number}
   */
  get bufferVersion() {
    return this._buffers[0].version;
  }

  get instancedBufferVersion() {
    return this._instancedBuffers[0].version;
  }

}
