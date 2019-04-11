import { VODescriptor, VertexObject } from '../sprites';

import { BitmapCharMethods, BitmapCharMethodsType } from './BitmapCharMethods';
import { IBitmapChar } from './IBitmapChar';

const BitmapCharDescription = {

  vertexCount: 4,

  attributes: {

    position: ['x', 'y', 'z'],
    uv: ['s', 't'],

  },

  methods: BitmapCharMethods,

};

export type BitmapCharDescriptorType = VODescriptor<BitmapCharMethodsType, IBitmapChar>;
export type BitmapCharVertexObject = VertexObject<BitmapCharMethodsType, IBitmapChar>;

let g_bitmapCharDescriptor: BitmapCharDescriptorType = null;

export const getBitmapCharDescriptor = () => {
  if (g_bitmapCharDescriptor == null) {
    g_bitmapCharDescriptor = new VODescriptor<BitmapCharMethodsType, IBitmapChar>(BitmapCharDescription);
  }
  return g_bitmapCharDescriptor;
};
