import * as THREE from 'three';

import { TextureAtlas } from './TextureAtlas';
import { TextureLibrary } from './TextureLibrary';
import { Texture } from './Texture';

const $maxAnisotrophy = Symbol('maxAnisotrophy');

export class TextureUtils {

  DefaultAnisotrophy: number;
  DefaultFilter: THREE.TextureFilter;

  private readonly [$maxAnisotrophy]: number;

  constructor({ maxAnisotrophy, defaultAnisotrophy, defaultFilter }: { maxAnisotrophy: number, defaultAnisotrophy?: number, defaultFilter?: THREE.TextureFilter }) {
    this[$maxAnisotrophy] = maxAnisotrophy;
    this.DefaultAnisotrophy = defaultAnisotrophy || 0;
    this.DefaultFilter = defaultFilter || THREE.NearestFilter;
  }

  makeTexture(source: TextureAtlas|TextureLibrary|Texture, filter: THREE.TextureFilter = this.DefaultFilter, anisotropy = this.DefaultAnisotrophy) {

    let texture: THREE.Texture = null;

    if (source instanceof TextureLibrary) {
      texture = new THREE.Texture(source.atlas.baseTexture.imgEl);
    } else if (source instanceof TextureAtlas) {
      texture = new THREE.Texture(source.baseTexture.imgEl);
    } else { // is a Texture!
      texture = new THREE.Texture((source as Texture).imgEl);
    }

    texture.flipY = false;

    texture.magFilter = filter;
    texture.minFilter = filter;

    texture.anisotropy = anisotropy === Infinity ? this[$maxAnisotrophy] : anisotropy;

    texture.needsUpdate = true;

    return texture;
  }

}
