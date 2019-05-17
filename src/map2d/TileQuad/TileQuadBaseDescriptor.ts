import { VODescriptor, VertexObject } from '../../sprites';

import { TileQuadBase } from './TileQuadBase';
import { TileQuadBaseMethodsType, TileQuadBaseMethods } from './TileQuadBaseMethods';

const TileQuadBaseDescription = {

  vertexCount: 4,

  attributes: [{
    name: 'position',
    scalars: ['x', 'z'],
  }, {
    name: 'uv',
    scalars: ['s', 't'],
  }],

  methods: TileQuadBaseMethods,

};

export type TileQuadBaseDescriptorType = VODescriptor<TileQuadBaseMethodsType, TileQuadBase>;
export type TileQuadBaseVertexObject = VertexObject<TileQuadBaseMethodsType, TileQuadBase>;

let g_tileQuadBaseDescriptor: TileQuadBaseDescriptorType = null;

export const getTileQuadBaseDescriptor = () => {
  if (g_tileQuadBaseDescriptor == null) {
    g_tileQuadBaseDescriptor = new VODescriptor<TileQuadBaseMethodsType, TileQuadBase>(TileQuadBaseDescription);
  }
  return g_tileQuadBaseDescriptor;
};
