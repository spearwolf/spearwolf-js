/* eslint-env browser */
import { sample } from '../utils';

import { PowerOf2Image } from './PowerOf2Image';
import { Texture } from './Texture';

export class TextureAtlas {

  static async load(path, basePath = './') {
    const atlas = await fetch(`${basePath}${path}`).then((response) => response.json());
    const baseTexture = new Texture(await new PowerOf2Image(`${basePath}${atlas.meta.image}`).loaded);
    return new TextureAtlas(baseTexture, atlas);
  }

  _frames = new Map();
  _allFrames = [];
  _allFrameNames = [];

  constructor(baseTexture, data) {
    this.baseTexture = baseTexture;
    Object.keys(data.frames).forEach((name) => {
      const { frame } = data.frames[name];
      this.addFrame(name, frame.w, frame.h, frame.x, frame.y);
    });
  }

  addFrame(name, width, height, x, y) {
    const tex = new Texture(this.baseTexture, width, height, x, y);
    this._allFrameNames.push(name);
    this._allFrames.push(tex);
    this._frames.set(name, tex);
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
}
