import * as THREE from 'three';

/**
 * @typedef {import("./SpriteGroupBufferGeometry").SpriteGroupBufferGeometry} SpriteGroupBufferGeometry
 */

/**
 * @typedef {import("../sprites").SpriteGroup} SpriteGroup
 */

export class SpriteGroupMesh extends THREE.Mesh {

  /**
   * @param {SpriteGroupBufferGeometry} spriteGroupGeometry
   * @param {THREE.Material} material
   */
  constructor(spriteGroupGeometry, material) {
    super(
      spriteGroupGeometry,
      material,
    );

    const { /** @type {SpriteGroup} */spriteGroup } = spriteGroupGeometry.parameters;

    this.onBeforeRender = /**
     * @param {THREE.WebGLRenderer} renderer
     * @param {THREE.Scene} scene
     * @param {THREE.Camera} camera
     * @param {SpriteGroupBufferGeometry} geometry
     */
      (renderer, scene, camera, geometry/*, material, group */) => {

        const { ref } = spriteGroup.voPool.voArray;

        if (ref.hasHint('autotouch', true)) {
          spriteGroup.touchVertexBuffers();
        }

        const { bufferVersion } = geometry;
        if (ref.serial !== bufferVersion) {
          geometry.updateBuffers();
          ref.serial = geometry.bufferVersion;
        }

        const { usedCount, indices } = spriteGroup;
        geometry.setDrawRange(0, usedCount * indices.itemCount);

      };
  }

}
