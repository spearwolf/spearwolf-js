import { SpriteGroupMesh, SpriteGroupInstancedBufferGeometry } from '../../sprites';

import { TileQuad } from '../TileQuad/TileQuad';
import { TileQuadBase } from '../TileQuad/TileQuadBase';
import { TileQuadBaseMethodsType } from '../TileQuad/TileQuadBaseMethods';
import { TileQuadGroup, TileQuadGroupOptions } from '../TileQuad/TileQuadGroup';
import { TileQuadMethodsType } from '../TileQuad/TileQuadMethods';
import { TileQuadMaterial } from './TileQuadMaterial';
import { getTileQuadBaseGroup } from '../TileQuad/TileQuadBaseGroup';

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
