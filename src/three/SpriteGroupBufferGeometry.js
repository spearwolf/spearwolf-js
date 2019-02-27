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

    Object.keys(descriptor.attr).forEach(attrName => {

      const attr = descriptor.attr[attrName];
      const typedArray = voArray[`${attr.type}Array`];

      const stride = descriptor.bytesPerVertex / attr.bytesPerElement;
      const buffer = new THREE.InterleavedBuffer(typedArray, stride);
      const bufferAttr = new THREE.InterleavedBufferAttribute(buffer, attr.size, attr.offset);

      this.addAttribute(attrName, bufferAttr);

    });
  }

}
