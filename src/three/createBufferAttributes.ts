import * as THREE from 'three';

import { SpriteGroup } from '../sprites';

type CreateBufferFn<K> = (typedArray: any, stride: number) => K;

export function createBufferAttributes<T, K = THREE.InterleavedBuffer> (
  spriteGroup: SpriteGroup<T>,
  bufferGeometry: THREE.BufferGeometry,
  createBuffer: CreateBufferFn<K>,
) {

  const { descriptor } = spriteGroup;
  const { voArray } = spriteGroup.voPool;

  const bufCollection: K[] = [];
  const bufMap: Map<string, K> = new Map();

  const isDynamic = spriteGroup.voPool.voArray.ref.hasHint('dynamic', true);

  Object.keys(descriptor.attr).forEach(attrName => {

    const attr = descriptor.attr[attrName];

    let buffer = bufMap.get(attr.type);

    if (!buffer) {

      const typedArray = voArray.getTypedArray(attr.type);
      const stride = descriptor.bytesPerVertex / typedArray.BYTES_PER_ELEMENT;

      // buffer = new THREE.InterleavedBuffer(typedArray, stride);
      buffer = createBuffer(typedArray, stride);
      (buffer as any).setDynamic(isDynamic);

      bufCollection.push(buffer);
      bufMap.set(attr.type, buffer);

    }

    const bufferAttr = new THREE.InterleavedBufferAttribute(buffer as any, attr.size, attr.offset);
    bufferGeometry.addAttribute(attrName, bufferAttr);

  });

  return bufCollection;

};
