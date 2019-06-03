import { WebGLRenderer, Texture, LinearFilter, NearestFilter } from 'three';
import { TextureAtlas } from './TextureAtlas';

const $renderer = Symbol('renderer');

export class TextureUtils {

  DefaultTexAnisotrophy = 0;

  private [$renderer]: WebGLRenderer;

  constructor(renderer: WebGLRenderer) {
    this[$renderer] = renderer;
  }

  makeTexture(source: TextureAtlas, anisotropy = this.DefaultTexAnisotrophy) {
   
    const texture = new Texture(source.baseTexture.imgEl);

    texture.flipY = false;

    if (anisotropy === 0) {

      texture.magFilter = NearestFilter;
      texture.minFilter = NearestFilter;

    } else {

      texture.minFilter = LinearFilter;
      texture.magFilter = LinearFilter;

      texture.anisotropy = anisotropy === Infinity ? this[$renderer].capabilities.getMaxAnisotropy() : anisotropy;

    }

    texture.needsUpdate = true;

    return texture;
  }

}
