import { SpriteGroupTextured, VOIndices, SpriteGroupTexturedOptions } from '../../../sprites';
import { Texture, TextureLibrary } from '../../../textures';

import { Map2DViewTile } from '../../Map2DViewTile';

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

  showTiles(viewTile: Map2DViewTile, textureLibrary: TextureLibrary) {

    this.voPool.freeAll();

    const {
      viewWidth,
      viewHeight,
      viewOffsetX,
      viewOffsetY,
      width: tileCols,
      height: tileRows,
    } = viewTile;

    const tileWidth = viewWidth / tileCols;
    const tileHeight = viewHeight / tileRows;

    viewTile.fetchTileIds();

    let y = -viewOffsetY;

    for (let row = 0; row < tileRows; ++row) {

      let x = viewOffsetX;

      for (let col = 0; col < tileCols; ++col) {

        // the internal map2d (x,y) coordinates are mapped to the 3d coordinates (x, 0, y)

        const z = viewHeight - y - tileHeight;

        const tileId = viewTile.getTileIdAt(col, tileRows - row - 1);
        if (tileId > 0) {

          const texture = textureLibrary.getTextureById(tileId);

          this.createSpriteByTexture(texture, tileWidth, tileHeight).translate(x, z, 0);

        }

        x += tileWidth;
      }
      y += tileHeight;
    }

    this.touchVertexBuffers();

  }

}
