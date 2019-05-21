import { VODescriptor, VertexObject } from '../../sprites';

import { ITileQuad } from './ITileQuad';
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

export type TileQuadDescriptorType = VODescriptor<TileQuadMethodsType, ITileQuad>;
export type TileQuadVertexObject = VertexObject<TileQuadMethodsType, ITileQuad>;

let g_tileQuadDescriptor: TileQuadDescriptorType = null;

export const getTileQuadDescriptor = () => {
  if (g_tileQuadDescriptor == null) {
    g_tileQuadDescriptor = new VODescriptor<TileQuadMethodsType, ITileQuad>(TileQuadDescription);
  }
  return g_tileQuadDescriptor;
};
