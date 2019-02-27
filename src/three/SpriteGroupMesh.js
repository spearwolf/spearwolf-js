import * as THREE from 'three';

export class SpriteGroupMesh extends THREE.Mesh {

  /**
   * @param {import("./SpriteGroupBufferGeometry").SpriteGroupBufferGeometry} spriteGroupGeometry 
   * @param {THREE.Material} material 
   */
  constructor(spriteGroupGeometry, material) {
    super(
      spriteGroupGeometry,
      material,
    );

    const { spriteGroup } = spriteGroupGeometry.parameters;

    this.onBeforeRender = (renderer, scene, camera, geometry/*, material, group */) => {

      const { ref } = spriteGroup.voPool.voArray;

      if (ref.hasHint('autotouch', true)) {
        // TODO hint: doubleBuffer
        spriteGroup.touchVertexBuffers();
      }

      const { bufferVersion } = geometry;
      if (ref.serial > bufferVersion) {
        geometry.updateBuffers();
        ref.serial = geometry.bufferVersion;
      }

      const { usedCount, indices: { itemCount } } = spriteGroup;
      geometry.setDrawRange(0, usedCount * itemCount);

    };
  }

}
