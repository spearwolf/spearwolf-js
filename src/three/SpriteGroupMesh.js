import * as THREE from 'three';

/**
 * @typedef {import("./SpriteGroupBufferGeometry").SpriteGroupBufferGeometry} SpriteGroupBufferGeometry
 */

/**
 * @typedef {import("./SpriteGroupInstancedBufferGeometry").SpriteGroupInstancedBufferGeometry} SpriteGroupInstancedBufferGeometry
 */

/**
 * @typedef {import("../sprites").SpriteGroup} SpriteGroup
 */

const updateBuffers = (spriteGroup, geometryUpdateBuffers, geometryBufferVersion) => {
  const { ref } = spriteGroup.voPool.voArray;

  if (ref.hasHint('autotouch', true)) {
    spriteGroup.touchVertexBuffers();
  }

  const { bufferVersion } = geometryBufferVersion();
  if (ref.serial !== bufferVersion) {
    geometryUpdateBuffers();
    ref.serial = bufferVersion;
  }
}

export class SpriteGroupMesh extends THREE.Mesh {

  /**
   * @param {SpriteGroupBufferGeometry|SpriteGroupInstancedBufferGeometry} spriteGroupGeometry
   * @param {THREE.Material} material
   */
  constructor(spriteGroupGeometry, material) {
    super(
      spriteGroupGeometry,
      material,
    );

    if (spriteGroupGeometry.type === 'spearwolf.SpriteGroupGeometry') {

      const { /** @type {SpriteGroup} */spriteGroup } = spriteGroupGeometry.parameters;

      this.onBeforeRender = /**
      * @param {THREE.WebGLRenderer} renderer
      * @param {THREE.Scene} scene
      * @param {THREE.Camera} camera
      * @param {SpriteGroupBufferGeometry} geometry
      */
        (renderer, scene, camera, geometry/*, material, group */) => {

          updateBuffers(
            spriteGroup,
            () => geometry.updateBuffers(),
            () => geometry.bufferVersion,
          );

          // if (ref.hasHint('autotouch', true)) {
          //   spriteGroup.touchVertexBuffers();
          // }

          // const { bufferVersion } = geometry;
          // if (ref.serial !== bufferVersion) {
          //   geometry.updateBuffers();
          //   ref.serial = geometry.bufferVersion;
          // }

          const { usedCount, indices } = spriteGroup;
          geometry.setDrawRange(0, usedCount * indices.itemCount);

        };

    } else if (spriteGroupGeometry.type === 'spearwolf.SpriteGroupInstancedBufferGeometry') {

      const {
        /** @type {SpriteGroup} */baseSpriteGroup,
        /** @type {SpriteGroup} */spriteGroup,
      } = spriteGroupGeometry.parameters;

      this.onBeforeRender = /**
      * @param {THREE.WebGLRenderer} renderer
      * @param {THREE.Scene} scene
      * @param {THREE.Camera} camera
      * @param {SpriteGroupInstancedBufferGeometry} geometry
      */
        (renderer, scene, camera, geometry/*, material, group */) => {

          updateBuffers(
            baseSpriteGroup,
            () => geometry.updateBuffers(),
            () => geometry.bufferVersion,
          );

          updateBuffers(
            spriteGroup,
            () => geometry.updateInstanceBuffers(),
            () => geometry.instanceBufferVersion,
          );

          const { usedCount, indices } = baseSpriteGroup;
          geometry.setDrawRange(0, usedCount * indices.itemCount);

          geometry.maxInstancedCount = spriteGroup.usedCount;

        };

    }

  }

}
