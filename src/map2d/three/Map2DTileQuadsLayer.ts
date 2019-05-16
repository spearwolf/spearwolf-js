import * as THREE from 'three';

import { TextureLibrary } from '../../textures';

import { Map2DViewTile } from '../Map2DViewTile';

import { IMap2DLayer } from './IMap2DLayer';
import { TileQuadMaterial } from './TileQuad/TileQuadMaterial';
import { TileQuadMesh } from './TileQuad/TileQuadMesh';

const $obj3d = Symbol('obj3d');
const $material = Symbol('material');
const $texture = Symbol('texture');
const $tiles = Symbol('tiles');

const $destroyTile = Symbol('destroyTile');
const $createTileMesh = Symbol('createTileMesh');

function makeTexture(htmlElement: HTMLImageElement) {

  const texture = new THREE.Texture(htmlElement);

  texture.flipY = false;
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;

  return texture;

}

/**
 * Represents a map2d layer.
 *
 * Each tile is rendered with the same material which is built upon the *base image* from the given [[TextureLibrary]].
 *
 * Internally a [[TileQuadMesh]] is used for the tiles.
 */

export class Map2DTileQuadsLayer implements IMap2DLayer {

  readonly textureLibrary: TextureLibrary;

  private readonly [$obj3d]: THREE.Object3D = new THREE.Object3D();

  private readonly [$texture]: THREE.Texture;
  private readonly [$material]: TileQuadMaterial;

  private readonly [$tiles]: Map<string, TileQuadMesh> = new Map();

  constructor(textureLibrary: TextureLibrary) {

    this.textureLibrary = textureLibrary;

    const texture = makeTexture(textureLibrary.atlas.baseTexture.imgEl as HTMLImageElement);
    this[$texture] = texture;
    this[$material] = new TileQuadMaterial(texture);

  }

  getObject3D() {
    return this[$obj3d];
  }

  dispose() {
    const tiles = this[$tiles];
    Array.from(tiles.values()).forEach((tile) => {
      tile.geometry.dispose();
    });
    tiles.clear();

    this[$texture].dispose();
    this[$material].dispose();
  }

  addViewTile(tile: Map2DViewTile) {
    const mesh = this[$createTileMesh](tile);
    mesh.name = tile.id;
    this[$obj3d].add(mesh);
  }

  removeViewTile(tileId: string) {
    const mesh = this[$destroyTile](tileId);
    if (mesh !== null) {
      this[$obj3d].remove(mesh);
      mesh.geometry.dispose();
    }
  }

  renderViewTile(_tile: Map2DViewTile) {
    // console.log('[Map2DSceneTHREE] update grid-tile:', tile.id);
  }

  private [$destroyTile](id: string): THREE.Mesh {
    const tiles = this[$tiles];
    if (tiles.has(id)) {
      const mesh = tiles.get(id);
      tiles.delete(id);
      return mesh;
    }
    return null;
  }

  private [$createTileMesh](viewTile: Map2DViewTile): THREE.Mesh {

    // TODO cache/re-use TileQuadMesh instances
    const mesh = new TileQuadMesh(this[$material], { capacity: viewTile.width * viewTile.height });

    mesh.showTiles(viewTile, this.textureLibrary);

    this[$tiles].set(viewTile.id, mesh);
    return mesh;
  }
}
