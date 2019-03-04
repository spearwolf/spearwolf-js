import * as THREE from 'three';

export const makeTexture = (htmlElement) => {
  const texture = new THREE.Texture(htmlElement);
  texture.flipY = false;
  texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;
  return texture;
};
