import { SpriteGroupTextured, VOIndices, SpriteGroupTexturedOptions } from '../../../sprites';
import { Texture } from '../../../textures';

import { TileQuad } from './TileQuad';
import { TileQuadMethodsType } from './TileQuadMethods';
import { getTileQuadDescriptor, TileQuadVertexObject } from './TileQuadDescriptor';

export interface TileQuadGroupOptions extends SpriteGroupTexturedOptions<TileQuadMethodsType, TileQuad> {
}

export class TileQuadGroup extends SpriteGroupTextured<TileQuadMethodsType, TileQuad> {

  constructor(options?: TileQuadGroupOptions) {
    super(getTileQuadDescriptor(), Object.assign({

      indices: VOIndices.buildQuads,

      dynamic: true,
      autotouch: false,

      setSize: (sprite: TileQuadVertexObject, w: number, h: number) => sprite.setSize(w, h),
      setTexCoordsByTexture: (sprite: TileQuadVertexObject, texture: Texture) => sprite.setTexCoordsByTexture(texture),

    }, options));
  }

  /**
   * Mark the internal vertex buffer so that it can be uploaded to the gpu memory the next time before we render it
   */
  touchVertexBuffers() {
    ++this.voPool.voArray.serial;
  }

}
