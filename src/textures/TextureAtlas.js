/* eslint-env browser */
import { sample, unpick } from '../utils';

import { PowerOf2Image } from './PowerOf2Image';
import { Texture } from './Texture';

const filterFrameFeatures = unpick(['frame']);

export class TextureAtlas {

  static async load(path, basePath = './') {
    const atlas = await fetch(`${basePath}${path}`).then((response) => response.json());
    const baseTexture = new Texture(await new PowerOf2Image(`${basePath}${atlas.meta.image}`).loaded);
    return new TextureAtlas(baseTexture, atlas);
  }

  _frames = new Map();

  _allFrames = [];
  _allFrameNames = [];

  _features = null;

  constructor(baseTexture, data) {

    this.baseTexture = baseTexture;

    Object.keys(data.frames).forEach((name) => {
      const frameData = data.frames[name];
      const { frame } = frameData;
      const features = filterFrameFeatures(frameData);
      this.addFrame(name, frame.w, frame.h, frame.x, frame.y, features);
    });

    const { meta } = data;
    if (meta !== undefined) {
      Object.keys(meta).forEach((name) => {
        this.setFeature(name, meta[name]);
      });
    }

  }

  addFrame(name, width, height, x, y, features = null) {
    const tex = new Texture(this.baseTexture, width, height, x, y);
    this._allFrameNames.push(name);
    this._allFrames.push(tex);
    this._frames.set(name, tex);
    if (features != null) {
      Object.keys(features).forEach((name) => {
        tex.setFeature(name, features[name]);
      });
    }
  }

  frame(name) {
    return this._frames.get(name);
  }

  randomFrame() {
    return sample(this._allFrames);
  }

  frameNames(match) {
    if (match) {
      const regex = typeof match === 'string' ? new RegExp(match) : match;
      return this._allFrameNames.filter((name) => regex.test(name));
    }
    return this._allFrameNames;
  }

  randomFrameName() {
    return sample(this._allFrameNames);
  }

  getFeature(name) {
    return this._features !== null ? this._features.get(name) : undefined;
  }

  setFeature(name, value) {
    if (this._features === null) {
      this._features = new Map();
    }
    this._features.set(name, value);
  }

}
