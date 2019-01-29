
// === PowerOf2Image ===

export type ImageSource = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;

export class PowerOf2Image {

  readonly loaded: Promise<PowerOf2Image>;

  imgEl: ImageSource;

  origWidth: number;
  origHeight: number;

  constructor(from: string | ImageSource);

  readonly isLoaded: boolean;

  readonly width: number;
  readonly height: number;
}

// === Texture ===

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

// === TextureAtlas ===

export class TextureAtlas {

  static load(path: string, basePath: string): Promise<TextureAtlas>;

  constructor(baseTexture: Texture, data: Object);

  addFrame(name: string, width: number, height: number, x: number, y: number): void;

  frame(name: string): Texture;
  randomFrame(): Texture;

  frameNames(match?: string | RegExp): string[];
  randomFrameName(): string;

}
