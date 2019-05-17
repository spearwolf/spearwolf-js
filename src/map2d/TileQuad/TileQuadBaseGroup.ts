import { SpriteGroup, VOIndices } from '../../sprites';

import { TileQuadBase } from './TileQuadBase';
import { TileQuadBaseMethodsType } from './TileQuadBaseMethods';
import { getTileQuadBaseDescriptor, TileQuadBaseVertexObject } from './TileQuadBaseDescriptor';

export interface TileQuadBaseGroupOptions {

  capacity?: number;

  dynamic?: boolean;

}

export class TileQuadBaseGroup extends SpriteGroup<TileQuadBaseMethodsType, TileQuadBase> {

  constructor(options?: TileQuadBaseGroupOptions) {
    super(getTileQuadBaseDescriptor(), Object.assign({

      indices: VOIndices.buildQuads,

      dynamic: false,

      setSize: (sprite: TileQuadBaseVertexObject, w: number, h: number) => sprite.setSize(w, h),

    }, options));
  }

}

export const getTileQuadBaseGroup = (() => {

  let baseTiles: TileQuadBaseGroup = null;

  return () => {
    if (baseTiles === null) {

      baseTiles = new TileQuadBaseGroup({ capacity: 1, dynamic: false });

      baseTiles.createSprite(1, 1).setUv(0, 1, 1, 1, 1, 0, 0, 0);

    }
    return baseTiles;
  };
})();
