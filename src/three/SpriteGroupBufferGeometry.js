import * as THREE from 'three';

import { createAttributes } from './createAttributes';

export class SpriteGroupBufferGeometry extends THREE.BufferGeometry {

  /**
   * @param {import("../sprites").SpriteGroup} spriteGroup
   */
  constructor(spriteGroup) {
    super();

    this.type = 'spearwolf.SpriteGroupBufferGeometry';

    this.parameters = {
      spriteGroup,
    };

    this.setIndex(spriteGroup.indices.indices);

    /**
     * @private
     * @type {THREE.InterleavedBuffer[]}
     */
    this._buffers = createAttributes(spriteGroup, this, (typedArray, stride) => new THREE.InterleavedBuffer(typedArray, stride));

    spriteGroup.voPool.voArray.ref.serial = this.bufferVersion;
  }

  updateBuffers() {
    this._buffers.forEach((buf) => {
      buf.needsUpdate = true;
    });
  }

  /**
   * @type {number}
   */
  get bufferVersion() {
    return this._buffers[0].version;
  }

}
