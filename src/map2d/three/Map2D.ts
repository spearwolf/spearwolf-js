import * as THREE from 'three';

import { IMap2DRenderer } from '../IMap2DRenderer';
import { Map2DView } from '../Map2DView';

import { IMap2DLayer } from './IMap2DLayer';
import { Matrix4 } from 'three';

const $map2dLayers = Symbol('map2dLayers');

export class Map2D extends THREE.Object3D implements IMap2DRenderer {

  static BeginRenderEvent = 'map2dbeginrender';
  static EndRenderEvent = 'map2dendrender';

  private readonly [$map2dLayers] = new Set<IMap2DLayer>();

  constructor() {
    super();
    this.applyMatrix(new Matrix4().makeScale(1, -1, 1));
  }

  appendLayer(layer: IMap2DLayer) {
    const layers = this[$map2dLayers];
    if (!layers.has(layer)) {
      layers.add(layer);
      this.add(layer.getObject3D());
    }
  }

  removeLayer(layer: IMap2DLayer) {
    const layers = this[$map2dLayers];
    if (layers.has(layer)) {
      layers.delete(layer);
      this.remove(layer.getObject3D());
    }
  }

  beginRender(view: Map2DView) {
    this.children.forEach((obj3d) => obj3d.dispatchEvent({ type: Map2D.BeginRenderEvent, map2d: this, view }));
  }

  endRender(view: Map2DView) {
    this.children.forEach((obj3d) => obj3d.dispatchEvent({ type: Map2D.EndRenderEvent, map2d: this, view }));
  }
}
