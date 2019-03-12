import * as THREE from 'three';

import { createAttributes } from './createAttributes';

/** @typedef {import('../sprites').SpriteGroup} SpriteGroup */

export class SpriteGroupInstancedBufferGeometry extends THREE.InstancedBufferGeometry {

  /**
   * @param {SpriteGroup} baseSpriteGroup
   * @param {SpriteGroup} spriteGroup
   */
  constructor(baseSpriteGroup, spriteGroup) {
    super();

    this.type = 'spearwolf.SpriteGroupInstancedBufferGeometry';

    this.parameters = {
      baseSpriteGroup,
      spriteGroup,
    };

    this.setIndex(baseSpriteGroup.indices.indices);

    /**
     * @private
     * @type {THREE.InterleavedBuffer[]}
     */
    this._buffers = createAttributes(baseSpriteGroup, this, (typedArray, stride) => new THREE.InterleavedBuffer(typedArray, stride));

    baseSpriteGroup.voPool.voArray.ref.serial = this.bufferVersion;

    /**
     * @private
     * @type {THREE.InstancedInterleavedBuffer[]}
     */
    this._instancedBuffers = createAttributes(spriteGroup, this, (typedArray, stride) => new THREE.InstancedInterleavedBuffer(typedArray, stride, 1));

    spriteGroup.voPool.voArray.ref.serial = this.instanceBufferVersion;
  }

  updateBuffers() {
    this._buffers.forEach((buf) => {
      buf.needsUpdate = true;
    });
  }

  updateInstanceBuffers() {
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

  get instanceBufferVersion() {
    return this._instancedBuffers[0].version;
  }

}
