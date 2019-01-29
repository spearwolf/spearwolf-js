import { PowerOf2Image } from './PowerOf2Image';

export class Texture {

  /**
   * @param {string} url 
   * @returns {Promise<Texture>}
   */
  static async load(url) {
    return new Texture(await new PowerOf2Image(url).loaded);
  }

  /**
   * @type {PowerOf2Image|Image|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement}
   */
  image = null;

  /**
   * @type {Texture}
   */
  parent = null;

  /**
   * @type {number}
   */
  x = 0;

  /**
   * @type {number}
   */
  y = 0;

  /**
   * @private
   * @pyte {number}
   */
  _width = 0;

  /**
   * @private
   * @pyte {number}
   */
  _height = 0;

  /**
   * Create a texture.
   * @param {Texture|PowerOf2Image|Image|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} source
   * @param {number} width
   * @param {number} height
   * @param {number} [x=0]
   * @param {number} [y=0]
   */
  constructor(source, width, height, x = 0, y = 0) {
    let w = width;
    let h = height;

    if (source instanceof Texture) {
      this.parent = source;
      this.image = null;
    } else if (typeof source === 'object' && 'width' in source && 'height' in source) {
      this.image = source;
      this.parent = null;
      if ('origWidth' in source && 'origHeight' in source) {
        w = source.origWidth;
        h = source.origHeight;
      }
    } else {
      throw new Error(`Texture() constructor panic: unexpected parameter {source: ${source}}`);
    }

    this._width = w;
    this._height = h;

    this.x = x;
    this.y = y;
  }

  get root() {
    return (this.parent && this.parent.root) || this;
  }

  get imgEl() {
    const { root } = this;
    if (root.image instanceof PowerOf2Image) {
      return root.image.imgEl;
    }
    return root.image;
  }

  get width() {
    return (typeof this._width === 'number'
      ? this._width
      : (this.image
        ? this.image.width
        : (this.parent
          ? this.root.width
          : 0
        )
      )
    );
  }

  set width(w) {
    this._width = w;
  }

  get height() {
    return (typeof this._height === 'number'
      ? this._height
      : (this.image
        ? this.image.height
        : (this.parent
          ? this.root.height
          : 0
        )
      )
    );
  }

  set height(h) {
    this._height = h;
  }

  get minS() {
    let { x } = this;
    let texture = this;

    while ((texture = texture.parent) != null) {
      x += texture.x;
    }

    return x / this.root.image.width;
  }

  get minT() {
    let { y } = this;
    let texture = this;

    while ((texture = texture.parent) != null) {
      y += texture.y;
    }

    return y / this.root.image.height;
  }

  get maxS() {
    let x = this.x + this.width;
    let texture = this;

    while ((texture = texture.parent) != null) {
      x += texture.x;
    }

    return x / this.root.image.width;
  }

  get maxT() {
    let y = this.y + this.height;
    let texture = this;

    while ((texture = texture.parent) != null) {
      y += texture.y;
    }

    return y / this.root.image.height;
  }
}
