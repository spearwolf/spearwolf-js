import { ImageSource, PowerOf2Image } from './PowerOf2Image';

export type TextureImage = PowerOf2Image | ImageSource;
export type TextureSource = Texture | TextureImage;

export class Texture {

  static load(url: string): Promise<PowerOf2Image>;

  image: TextureImage;
  parent: Texture;

  x: number;
  y: number;

  constructor(source: TextureSource, width?: number, height?: number, x?: number, y?: number);

  readonly root: Texture;

  readonly imgEl: ImageSource;

  width: number;
  height: number;

  readonly minS: number;
  readonly minT: number;
  readonly maxS: number;
  readonly maxT: number;
}
