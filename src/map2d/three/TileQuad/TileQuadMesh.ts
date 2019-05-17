import { SpriteGroupMesh, SpriteGroupInstancedBufferGeometry } from '../../../sprites';

import { TileQuad } from './TileQuad';
import { TileQuadBase } from './TileQuadBase';
import { TileQuadBaseMethodsType } from './TileQuadBaseMethods';
import { TileQuadGroup, TileQuadGroupOptions } from './TileQuadGroup';
import { TileQuadMethodsType } from './TileQuadMethods';
import { TileQuadMaterial } from './TileQuadMaterial';
import { getTileQuadBaseGroup } from './TileQuadBaseGroup';

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

}
