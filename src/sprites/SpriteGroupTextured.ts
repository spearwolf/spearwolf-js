import { Texture } from '../textures';

import { SpriteGroup, SpriteGroupOptions } from './SpriteGroup';
import { VODescriptor } from './VODescriptor';

export type SpriteTexCoordsSetter = (sprite: Object, texture: Texture, descriptor: any) => void;

const DEFAULT_TEX_COORDS_SETTER = (sprite: any, texture: any) => sprite.setTexCoordsByTexture(texture);

export interface SpriteGroupTexturedOptions<T, U> extends SpriteGroupOptions<T, U> {

  setTexCoordsByTexture?: SpriteTexCoordsSetter;

}

export class SpriteGroupTextured<T, U> extends SpriteGroup<T, U> {

  setTexCoordsByTexture: SpriteTexCoordsSetter;

  constructor(descriptor: VODescriptor<T, U>, options: SpriteGroupTexturedOptions<T, U> = {}) {
    super(descriptor, options);

    this.setTexCoordsByTexture = (options.setTexCoordsByTexture || null) || DEFAULT_TEX_COORDS_SETTER;
  }

  /**
   * Create a sprite.
   */
  createSpriteByTexture(texture?: Texture, width?: number, height?: number) {
    let w: number;
    let h: number;

    if (texture != null && width === undefined) {
      w = texture.width;
      h = texture.height;
    } else {
      w = width;
      h = height;
    }

    const sprite = this.createSprite(w, h);

    const { setTexCoordsByTexture } = this;
    if (texture && setTexCoordsByTexture) {
      setTexCoordsByTexture(sprite, texture, this.descriptor);
    }

    return sprite;
  }

}
