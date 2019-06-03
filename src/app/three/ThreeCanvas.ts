import * as THREE from 'three';

import { readOption, pick, generateUuid } from '../../utils';
import { TextureUtils } from '../../textures';
import { ThreeWebGLRendererOptions } from './ThreeWebGLRendererOptions';

const CSS_CLASS_PIXELATE = `pixelate-${generateUuid()}`;
const CSS_PIXELATE = `
  .${CSS_CLASS_PIXELATE} {
    image-rendering: crisp-edges;
    image-rendering: pixelated;
  }
`;

const pickThreeParameters = pick([
  'precision',
  'alpha',
  'premultipliedAlpha',
  'antialias',
  'stencil',
  'preserveDrawingBuffer',
  'powerPreference',
  'depth',
  'logarithmicDepthBuffer',
]);

const $lockPixelRatio = Symbol('lockPixelRatio');
const $lastPixelRatio = Symbol('lastPixelRatio');
const $rafID = Symbol('rafID');

export type ThreeCanvasResizeStrategy = 'canvas'| 'container';

export interface ThreeCanvasOptions extends ThreeWebGLRendererOptions {

  resizeStrategy?: ThreeCanvasResizeStrategy;

  /**
   * Restrict the *device pixel ratio* to 1 and activate pixel art mode
   * (set the `image-rendering` css prop for the `<canvas>` element)
   */
  pixelate?: boolean;

  /**
   * Set a fixed device pixel ratio. Otherwise DPR is read from `window.devicePixelRatio`
   */
  pixelRatio?: number;

  clearColor?: string | THREE.Color;

}

export class ThreeCanvas extends THREE.EventDispatcher {

  readonly renderer: THREE.WebGLRenderer;

  readonly canvas: HTMLCanvasElement;

  readonly texUtils: TextureUtils;

  resizeStrategy: ThreeCanvasResizeStrategy;

  /**
   * _css_ pixels
   */
  width = 0;

  /**
   * _css_ pixels
   */
  height = 0;

  /**
   * Time in *seconds*.
   */
  now = 0;

  /**
   * The time in *seconds* as it was at the last call of `frame()`.
   */
  lastNow = 0;

  /**
   * Seconds passed since the last render / previous call to `frame()`.
   */
  deltaTime = 0;

  /**
   * Current frame number. Initially set to 0.
   */
  frameNo = 0;

  pause = false;

  private [$lockPixelRatio] = 0;
  private [$lastPixelRatio] = 0;

  private [$rafID] = 0;

  constructor(el: HTMLElement, options?: ThreeCanvasOptions) {
    super();

    let defaultResizeStrategy = 'canvas';

    if (el && el.tagName === 'CANVAS') {
      this.canvas = el as HTMLCanvasElement;
    } else {
      this.canvas = document.createElement('canvas');
      if (el) {
        el.appendChild(this.canvas);
        defaultResizeStrategy = 'container';
      }
    }

    const pixelate = readOption(options, 'pixelate', false);

    if (pixelate) {
      const styleEl = document.createElement('style');
      styleEl.innerHTML = CSS_PIXELATE;
      document.head.appendChild(styleEl);
      this.canvas.classList.add(CSS_CLASS_PIXELATE);
      options.pixelRatio = 1;
    }

    this.resizeStrategy = readOption(options, 'resizeStrategy', defaultResizeStrategy) as ThreeCanvasResizeStrategy;

    this[$lockPixelRatio] = readOption(options, 'pixelRatio', 0) as number;

    const threeParams = Object.assign({
      precision: 'mediump',
    }, pickThreeParameters(options), {
      canvas: this.canvas,
    });

    this.renderer = new THREE.WebGLRenderer(threeParams);

    this.texUtils = new TextureUtils({
      maxAnisotrophy: this.renderer.capabilities.getMaxAnisotropy(),
      defaultAnisotrophy: pixelate ? 0 : Infinity,
      defaultFilter: pixelate ? THREE.NearestFilter : THREE.LinearFilter,
    });

    const clearColor = readOption(options, 'clearColor', new THREE.Color()) as THREE.Color | string;

    this.renderer.setClearColor(
      clearColor instanceof THREE.Color ? clearColor : new THREE.Color(clearColor),
      options.alpha ? 0 : 1,
    );

    this.resize();
  }

  get pixelRatio() {
    return this[$lockPixelRatio] || window.devicePixelRatio || 1;
  }

  resize() {
    const { canvas, pixelRatio } = this;

    const {
      clientWidth: wPx,
      clientHeight: hPx,
    } = this.resizeStrategy === 'container' ? canvas.parentNode as HTMLElement : canvas;

    if (pixelRatio !== this[$lastPixelRatio] || wPx !== this.width || hPx !== this.height) {

      this.width = wPx;
      this.height = hPx;
      this[$lastPixelRatio] = pixelRatio;

      this.renderer.setPixelRatio(this.pixelRatio);
      this.renderer.setSize(wPx, hPx);

      this.dispatchResizeEvent();
    }
  }

  dispatchResizeEvent() {
    this.dispatchEvent({

      width: this.width,
      height: this.height,

      threeCanvas: this,

      type: 'resize',

    });
  }

  dispatchFrameEvent(type: string) {
    this.dispatchEvent({

      type,

      threeCanvas: this,
      renderer: this.renderer,

      now: this.now,
      frameNo: this.frameNo,
      deltaTime: this.deltaTime,

      width: this.width,
      height: this.height,

    });
  }

  frame(now = window.performance.now()) {

    this.lastNow = this.now;
    this.now = now / 1000.0;

    if (this.frameNo > 0) {
      this.deltaTime = this.now - this.lastNow;
    }

    this.resize();

    if (this.frameNo === 0) {
      this.dispatchResizeEvent();
    }

    this.renderer.clear();

    this.dispatchFrameEvent('frame');

    this.frameNo++;

  }

  start() {
    const renderFrame = (now: number) => {
      if (!this.pause) {
        this.frame(now);
      }
      this[$rafID] = window.requestAnimationFrame(renderFrame);
    }
    this[$rafID] = window.requestAnimationFrame(renderFrame);
    this.pause = false;
  }

  stop() {
    window.cancelAnimationFrame(this[$rafID]);
  }

}
