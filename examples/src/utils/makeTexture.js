import * as THREE from 'three';

export const makeTexture = (htmlElement, anisotropy) => {
  const texture = new THREE.Texture(htmlElement);
  texture.flipY = false;
  texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;
  if (anisotropy) {
    texture.anisotropy = anisotropy;
  }
  return texture;
};
