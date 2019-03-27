import * as THREE from 'three';

import { SpriteGroup } from '../sprites';

import { SpriteGroupBufferGeometry } from './SpriteGroupBufferGeometry';
import { SpriteGroupInstancedBufferGeometry } from './SpriteGroupInstancedBufferGeometry';

function updateBuffers<T> (spriteGroup: SpriteGroup<T>, getBufferVersion: () => number, geometryUpdateBuffers: () => void) {

  const { ref } = spriteGroup.voPool.voArray;

  if (ref.hasHint('autotouch', true)) {
    spriteGroup.touchVertexBuffers();
  }

  const bufferVersion = getBufferVersion();

  if (ref.serial !== bufferVersion) {
    geometryUpdateBuffers();
    ref.serial = bufferVersion;
  }

}

export class SpriteGroupMesh<T, K = Object> extends THREE.Mesh {

  constructor(
    spriteGroupGeometry: SpriteGroupBufferGeometry<T> | SpriteGroupInstancedBufferGeometry<T, K>,
    material: THREE.Material,
  ) {
    super(
      spriteGroupGeometry,
      material,
    );

    if (spriteGroupGeometry.type === 'spearwolf.SpriteGroupGeometry') {

      const { spriteGroup } = spriteGroupGeometry.parameters;

      this.onBeforeRender = /**
      * @param {THREE.WebGLRenderer} renderer
      * @param {THREE.Scene} scene
      * @param {THREE.Camera} camera
      * @param {SpriteGroupBufferGeometry} geometry
      */
        (_renderer, _scene, _camera, geometry: THREE.Geometry | THREE.BufferGeometry, _material, _group) => {

          updateBuffers(
            spriteGroup,
            () => (geometry as SpriteGroupBufferGeometry<T>).bufferVersion,
            () => (geometry as SpriteGroupBufferGeometry<T>).updateBuffers(),
          );

          const { usedCount, indices } = spriteGroup;
          (geometry as THREE.BufferGeometry).setDrawRange(0, usedCount * indices.itemCount);

        };

    } else if (spriteGroupGeometry.type === 'spearwolf.SpriteGroupInstancedBufferGeometry') {

      const {
        baseSpriteGroup,
        spriteGroup,
      } = (spriteGroupGeometry as SpriteGroupInstancedBufferGeometry<T, K>).parameters;

      this.onBeforeRender = /**
      * @param {THREE.WebGLRenderer} renderer
      * @param {THREE.Scene} scene
      * @param {THREE.Camera} camera
      * @param {SpriteGroupInstancedBufferGeometry} geometry
      */
        (_renderer, _scene, _camera, geometry: THREE.Geometry | THREE.BufferGeometry, _material, _group) => {

          if (baseSpriteGroup) {

            updateBuffers(
              baseSpriteGroup,
              () => (geometry as SpriteGroupBufferGeometry<T>).bufferVersion,
              () => (geometry as SpriteGroupBufferGeometry<T>).updateBuffers(),
            );

            const { usedCount, indices } = baseSpriteGroup;
            (geometry as THREE.BufferGeometry).setDrawRange(0, usedCount * indices.itemCount);

          }

          updateBuffers(
            spriteGroup,
            () => (geometry as SpriteGroupInstancedBufferGeometry<T, K>).instancedBufferVersion,
            () => (geometry as SpriteGroupInstancedBufferGeometry<T, K>).updateInstancedBuffers(),
          );

          // geometry.maxInstancedCount = spriteGroup.usedCount;

        };

    }

  }

}
