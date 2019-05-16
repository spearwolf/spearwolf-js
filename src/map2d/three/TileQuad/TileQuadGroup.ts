import { SpriteGroupTextured, VOIndices } from '../../../sprites';
import { Texture } from '../../../textures';

import { TileQuad } from './TileQuad';
import { TileQuadMethodsType } from './TileQuadMethods';
import { getTileQuadDescriptor, TileQuadVertexObject } from './TileQuadDescriptor';

export interface TileQuadGroupOptions {

  capacity?: number;

  dynamic?: boolean;

}

export class TileQuadGroup extends SpriteGroupTextured<TileQuadMethodsType, TileQuad> {

  constructor(options?: TileQuadGroupOptions) {
    super(getTileQuadDescriptor(), Object.assign({

      indices: VOIndices.buildQuads,

      dynamic: true,

      setSize: (sprite: TileQuadVertexObject, w: number, h: number) => sprite.setSize(w, h),
      setTexCoordsByTexture: (sprite: TileQuadVertexObject, texture: Texture) => sprite.setTexCoordsByTexture(texture),

    }, options));
  }

}
