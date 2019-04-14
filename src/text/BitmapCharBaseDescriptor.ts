import { VODescriptor, VertexObject } from '../sprites';

import { BitmapCharBaseMethodsType, BitmapCharBaseMethods } from './BitmapCharBaseMethods';
import { IBitmapCharBase } from './IBitmapCharBase';

const BitmapCharBaseDescription = {

  vertexCount: 4,

  attributes: [{
    name: 'position',
    scalars: ['x', 'y'],
  }, {
    name: 'uv',
    scalars: ['s', 't'],
  }],

  methods: BitmapCharBaseMethods,

};

export type BitmapCharBaseDescriptorType = VODescriptor<BitmapCharBaseMethodsType, IBitmapCharBase>;
export type BitmapCharBaseVertexObject = VertexObject<BitmapCharBaseMethodsType, IBitmapCharBase>;

let g_bitmapCharBaseDescriptor: BitmapCharBaseDescriptorType = null;

export const getBitmapCharBaseDescriptor = () => {
  if (g_bitmapCharBaseDescriptor == null) {
    g_bitmapCharBaseDescriptor = new VODescriptor<BitmapCharBaseMethodsType, IBitmapCharBase>(BitmapCharBaseDescription);
  }
  return g_bitmapCharBaseDescriptor;
};
