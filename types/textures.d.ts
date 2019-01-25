
// === PowerOf2Image ===

export type ImageSource = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;

export class PowerOf2Image {

  readonly onLoaded: Promise<PowerOf2Image>;

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
