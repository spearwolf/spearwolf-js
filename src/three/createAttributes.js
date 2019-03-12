import * as THREE from 'three';

/** @typedef {import('../sprites').SpriteGroup} SpriteGroup */
/** @typedef {import('../sprites/VOArray').TypedArray} TypedArray */

/**
 * @private
 * @param {SpriteGroup} spriteGroup 
 * @param {THREE.BufferGeometry} bufferGeometry 
 * @param {(TypedArray, number) => THREE.InterleavedBuffer} createBuffer 
 */
export const createAttributes = (spriteGroup, bufferGeometry, createBuffer) => {

  const { descriptor } = spriteGroup;
  const { voArray } = spriteGroup.voPool;

  const bufCollection = [];
  const bufMap = new Map();

  const isDynamic = spriteGroup.voPool.voArray.ref.hasHint('dynamic', true);

  Object.keys(descriptor.attr).forEach(attrName => {

    const attr = descriptor.attr[attrName];

    let buffer = bufMap.get(attr.type);

    if (!buffer) {

      const typedArray = voArray.getTypedArray(attr.type);
      const stride = descriptor.bytesPerVertex / typedArray.BYTES_PER_ELEMENT;

      // buffer = new THREE.InterleavedBuffer(typedArray, stride);
      buffer = createBuffer(typedArray, stride);
      buffer.setDynamic(isDynamic);

      bufCollection.push(buffer);
      bufMap.set(attr.type, buffer);

    }

    const bufferAttr = new THREE.InterleavedBufferAttribute(buffer, attr.size, attr.offset);
    bufferGeometry.addAttribute(attrName, bufferAttr);

  });

  return bufCollection;

};
