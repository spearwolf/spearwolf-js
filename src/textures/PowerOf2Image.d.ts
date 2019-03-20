
export type ImageSource = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;

/**
 * Represents a `<img>` or `<canvas>` element which sizes (width and height) are
 * always power of 2.
 */
export class PowerOf2Image {

  readonly loaded: Promise<PowerOf2Image>;

  imgEl: ImageSource;

  origWidth: number;
  origHeight: number;

  /**
   * If image source dimension is NOT power of 2 then create a new `<canvas>`
   * (with power of 2 dimension) and copy the original image content onto it.
   * Since fetching imge data from server is a *async* operation the `imgEl` property
   * can be `null` right after object construction and will be set later after
   * image is loaded (and possible converted).
   */
  constructor(from: string | ImageSource);

  /**
   * `true` if the image has loaded and possible converted
   */
  readonly isLoaded: boolean;

  /**
   * Image width or `0` if image loading is not finished
   */
  readonly width: number;

  /**
   * Image height or `0` if image loading is not finished
   */
  readonly height: number;
}
