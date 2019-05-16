import { SpriteGroup, VOIndices } from '../../../sprites';

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
