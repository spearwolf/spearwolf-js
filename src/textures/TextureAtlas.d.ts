import { Texture } from './Texture';

export class TextureAtlas {

  /**
   * Load a texture atlas from json defintion
   */
  static load(path: string, basePath: string): Promise<TextureAtlas>;

  baseTexture: Texture;

  constructor(baseTexture: Texture, data: Object);

  addFrame(name: string, width: number, height: number, x: number, y: number): void;

  frame(name: string): Texture;
  randomFrame(): Texture;

  frameNames(match?: string | RegExp): string[];
  randomFrameName(): string;

}
