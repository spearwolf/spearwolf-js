import { VODescriptor, VertexObject } from '../../../sprites';

import { TileQuad } from './TileQuad';
import { TileQuadMethods, TileQuadMethodsType } from './TileQuadMethods';

const TileQuadDescription = {

  attributes: [{
    name: 'yPos',
  }, {
    name: 'pos',
    scalars: ['left', 'bottom', 'width', 'height'],
  }, {
    name: 'tex',
    scalars: ['originS', 'originT', 'maxS', 'maxT'],
  }],

  methods: TileQuadMethods,

};

export type TileQuadDescriptorType = VODescriptor<TileQuadMethodsType, TileQuad>;
export type TileQuadVertexObject = VertexObject<TileQuadMethodsType, TileQuad>;

let g_tileQuadDescriptor: TileQuadDescriptorType = null;

export const getTileQuadDescriptor = () => {
  if (g_tileQuadDescriptor == null) {
    g_tileQuadDescriptor = new VODescriptor<TileQuadMethodsType, TileQuad>(TileQuadDescription);
  }
  return g_tileQuadDescriptor;
};
