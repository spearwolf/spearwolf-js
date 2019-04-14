import { SpriteGroupTextured, VOIndices } from '../sprites';
import { Texture } from '../textures';

import { getBitmapCharDescriptor, BitmapCharVertexObject } from './BitmapCharDescriptor';
import { BitmapCharMethodsType } from './BitmapCharMethods';
import { IBitmapChar } from './IBitmapChar';

export interface BitmapCharGroupOptions {

  capacity?: number;

  dynamic?: boolean;

}

export class BitmapCharGroup extends SpriteGroupTextured<BitmapCharMethodsType, IBitmapChar> {

  constructor(options?: BitmapCharGroupOptions) {
    super(getBitmapCharDescriptor(), Object.assign({

      indices: VOIndices.buildQuads,

      dynamic: true,

      setSize: (sprite: BitmapCharVertexObject, w: number, h: number) => sprite.setSize(w, h),
      setTexCoordsByTexture: (sprite: BitmapCharVertexObject, texture: Texture) => sprite.setTexCoordsByTexture(texture),

    }, options));
  }

}
