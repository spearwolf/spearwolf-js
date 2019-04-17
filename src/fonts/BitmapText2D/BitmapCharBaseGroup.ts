import { SpriteGroup, VOIndices } from '../../sprites';

import { BitmapCharBase } from './BitmapCharBase';
import { BitmapCharBaseMethodsType } from './BitmapCharBaseMethods';
import { getBitmapCharBaseDescriptor, BitmapCharBaseVertexObject } from './BitmapCharBaseDescriptor';

export interface BitmapCharBaseGroupOptions {

  capacity?: number;

  dynamic?: boolean;

}

export class BitmapCharBaseGroup extends SpriteGroup<BitmapCharBaseMethodsType, BitmapCharBase> {

  constructor(options?: BitmapCharBaseGroupOptions) {
    super(getBitmapCharBaseDescriptor(), Object.assign({

      indices: VOIndices.buildQuads,

      dynamic: false,

      setSize: (sprite: BitmapCharBaseVertexObject, w: number, h: number) => sprite.setSize(w, h),

    }, options));
  }

}
