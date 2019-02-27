import * as THREE from 'three';

export class SpriteGroupBufferGeometry extends THREE.BufferGeometry {

  /**
   * @param {import('../sprites').SpriteGroup} spriteGroup
   */
  constructor(spriteGroup) {
    super();

    this.type = 'spearwolf.SpriteGroupBufferGeometry';

    this.parameters = {
      spriteGroup,
    };

    this.setIndex(spriteGroup.indices.indices);

    const { descriptor } = spriteGroup;
    const { voArray } = spriteGroup.voPool;

    /**
     * @private
     * @type {THREE.InterleavedBuffer[]}
     */
    this._buffers = [];

    /**
     * @private
     * @type {Map<THREE.InterleavedBuffer>}
     */
    this._bufMap = new Map();

    Object.keys(descriptor.attr).forEach(attrName => {

      const attr = descriptor.attr[attrName];

      let buffer = this._bufMap.get(attr.type);

      if (!buffer) {
        const typedArray = voArray[`${attr.type}Array`];
        const stride = descriptor.bytesPerVertex / typedArray.BYTES_PER_ELEMENT;

        buffer = new THREE.InterleavedBuffer(typedArray, stride);
        buffer.setDynamic(true); // TODO

        this._buffers.push(buffer);
        this._bufMap.set(attr.type, buffer);
      }

      const bufferAttr = new THREE.InterleavedBufferAttribute(buffer, attr.size, attr.offset);

      this.addAttribute(attrName, bufferAttr);

    });
  }

  updateBuffers() {
    this._buffers.forEach((buf) => {
      buf.needsUpdate = true;
    });
  }

}
