import { SpriteGroupMesh, SpriteGroupInstancedBufferGeometry } from '../../../sprites';

import { TextureLibrary } from '../../../textures';

import { Map2DViewTile } from '../../Map2DViewTile';

import { TileQuad } from './TileQuad';
import { TileQuadBase } from './TileQuadBase';
import { TileQuadBaseGroup } from './TileQuadBaseGroup';
import { TileQuadBaseMethodsType } from './TileQuadBaseMethods';
import { TileQuadGroup, TileQuadGroupOptions } from './TileQuadGroup';
import { TileQuadMethodsType } from './TileQuadMethods';
import { TileQuadMaterial } from './TileQuadMaterial';

const getTileQuadBaseGroup = (() => {

  let baseTiles: TileQuadBaseGroup = null;

  return () => {
    if (baseTiles === null) {

      baseTiles = new TileQuadBaseGroup({ capacity: 1, dynamic: false });

      baseTiles.createSprite(1, 1).setUv(0, 1, 1, 1, 1, 0, 0, 0);

    }
    return baseTiles;
  };
})();

export interface TileQuadMeshOptions extends TileQuadGroupOptions {
}

export class TileQuadMesh extends SpriteGroupMesh<TileQuadMethodsType, TileQuad, TileQuadBaseMethodsType, TileQuadBase> {

  tiles: TileQuadGroup;
  material: TileQuadMaterial;

  constructor(material: TileQuadMaterial, options?: TileQuadMeshOptions) {

    const tiles = new TileQuadGroup({

      voNew: null,
      voZero: null,

      ...options,

    });

    const geometry = new SpriteGroupInstancedBufferGeometry(getTileQuadBaseGroup(), tiles);

    super(geometry, material);

    this.tiles = tiles;
    this.material = material;

    this.type = 'TileQuadMesh';

  }

  showTiles(viewTile: Map2DViewTile, textureLibrary: TextureLibrary) {

    const { tiles } = this;

    tiles.voPool.freeAll();

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

          tiles.createSpriteByTexture(texture, tileWidth, tileHeight).translate(x, z, 0);

        }

        x += tileWidth;
      }
      y += tileHeight;
    }

    tiles.touchVertexBuffers();

  }

}
