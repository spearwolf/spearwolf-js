import { VODescriptor, VertexObject } from '../sprites';

import { BitmapCharMethods, BitmapCharMethodsType } from './BitmapCharMethods';
import { IBitmapChar } from './IBitmapChar';

const BitmapCharDescription = {

  attributes: [{
    name: 'zPos',
  }, {
    name: 'baselineOffset'
  }, {
    name: 'pos',
    scalars: ['originX', 'originY', 'width', 'height'],
  }, {
    name: 'tex',
    scalars: ['originS', 'originT', 'maxS', 'maxT'],
  }],

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
