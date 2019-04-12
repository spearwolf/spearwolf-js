import * as THREE from 'three';

import { SpriteGroupMesh, SpriteGroupBufferGeometry } from '../three';
import { TextureAtlas } from '../textures';

import { BitmapCharGroup, BitmapCharGroupOptions } from './BitmapCharGroup';
import { BitmapCharMethodsType } from './BitmapCharMethods';
import { BitmapFontMaterial } from './BitmapFontMaterial';
import { IBitmapChar } from './IBitmapChar';

function makeTexture(htmlElement: HTMLImageElement) {

  const texture = new THREE.Texture(htmlElement);

  texture.flipY = false;
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;

  return texture;

}

export interface BitmapText2DOptions extends BitmapCharGroupOptions {
}

export class BitmapText2D extends SpriteGroupMesh<BitmapCharMethodsType, IBitmapChar> {

  fontAtlas: TextureAtlas;
  bitmapChars: BitmapCharGroup;
  material: BitmapFontMaterial;

  constructor(fontAtlas: TextureAtlas, options?: BitmapText2DOptions) {

    const bitmapCharGroup = new BitmapCharGroup(options);
    const geometry = new SpriteGroupBufferGeometry(bitmapCharGroup);
    const material = new BitmapFontMaterial(makeTexture(fontAtlas.baseTexture.imgEl as HTMLImageElement));

    super(geometry, material);

    this.fontAtlas = fontAtlas;
    this.bitmapChars = bitmapCharGroup;
    this.material = material;

    this.type = 'BitmapText2D';

  }

}
