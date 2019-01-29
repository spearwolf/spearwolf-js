/* eslint-env browser */
import { sample } from '../utils';

import { PowerOf2Image } from './PowerOf2Image';
import { Texture } from './Texture';

export class TextureAtlas {

  /**
   * Load a texture atlas from json.
   * @param {string} path - path to json file
   * @param {string} basePath
   * @returns {Promise<TextureAtlas>}
   */
  static async load(path, basePath = './') {
    const atlas = await fetch(`${basePath}${path}`).then((response) => response.json());
    const baseTexture = new Texture(await new PowerOf2Image(`${basePath}${atlas.meta.image}`).loaded);
    return new TextureAtlas(baseTexture, atlas);
  }

  /**
   * @private
   * @type {Map<string, Texture>}
   */
  _frames = new Map();

  /**
   * @private
   * @type {Array<Texture>}
   */
  _allFrames = [];

  /**
   * @private
   * @type {Array<string>}
   */
  _allFrameNames = [];

  /**
   * Create a texture atlas.
   * @param {Texture} baseTexture 
   * @param {Object} data - json texture atlas data 
   */
  constructor(baseTexture, data) {
    this.baseTexture = baseTexture;
    Object.keys(data.frames).forEach((name) => {
      const { frame } = data.frames[name];
      this.addFrame(name, frame.w, frame.h, frame.x, frame.y);
    });
  }

  /**
   * Add a new named texture atlas frame.
   * @param {string} name 
   * @param {number} width 
   * @param {number} height 
   * @param {number} x 
   * @param {number} y 
   */
  addFrame(name, width, height, x, y) {
    const tex = new Texture(this.baseTexture, width, height, x, y);
    this._allFrameNames.push(name);
    this._allFrames.push(tex);
    this._frames.set(name, tex);
  }

  /**
   * Return a named frame.
   * @param {string} name 
   * @returns {Texture}
   */
  frame(name) {
    return this._frames.get(name);
  }

  /**
   * Return a random frame.
   * @returns {Texture}
   */
  randomFrame() {
    return sample(this._allFrames);
  }

  /**
   * Find existing and return frame names.
   * @param {string|RegExp} [match] - if match is not defined then you will get all existing frame names as result
   * @returns {Array<string>}
   */
  frameNames(match) {
    if (match) {
      const regex = typeof match === 'string' ? new RegExp(match) : match;
      return this._allFrameNames.filter((name) => regex.test(name));
    }
    return this._allFrameNames;
  }

  /**
   * Return a random frame name.
   * @returns {string}
   */
  randomFrameName() {
    return sample(this._allFrameNames);
  }
}
