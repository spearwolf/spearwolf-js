/* eslint-env browser */
import * as THREE from 'three';

import { readOption, pick } from '../utils';

/**
 * @private
 */
const filterThreeParameters = pick([
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

export class ThreeCanvas extends THREE.EventDispatcher {

  /**
   * @readonly
   * @type {THREE.WebGLRenderer}
   */
  renderer = null;

  /**
   * _css_ pixels
   * @readonly
   * @type {number}
   */
  width = 0;

  /**
   * _css_ pixels
   * @readonly
   * @type {number}
   */
  height = 0;

  /**
   * Time in *seconds*.
   * @readonly
   * @type {number}
   */
  now = 0;

  /**
   * The time in *seconds* as it was at the last call of `frame()`.
   * @readonly
   * @type {number}
   */
  lastNow = 0;

  /**
   * Seconds passed since the last render / previous call to `frame()`.
   * @readonly
   * @type {number}
   */
  deltaTime = 0;

  /**
   * Current frame number. Initially set to 0.
   * @readonly
   * @type {number}
   */
  frameNo = 0;

  /**
   * @type {boolean}
   */
  pause = false;

  /**
   * @private
   * @type {number}
   */
  _pixelRatio = 0;

  /**
   * @private
   * @type {number}
   */
  _rafID = 0;

  /**
   * @param {HTMLElement} el 
   * @param {Object} [options] 
   * @param {'canvas'|'container'} [options.resizeStrategy] 
   * @param {number} [options.pixelRatio] 
   * @param {string|THREE.Color} [options.clearColor] 
   * @param {'highp'|'mediump'|'lowp'} [options.precision='mediump'] - see [THREE.WebGLRenderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer)
   * @param {boolean} [options.alpha] - see [THREE.WebGLRenderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer)
   * @param {boolean} [options.premultipliedAlpha] - see [THREE.WebGLRenderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer)
   * @param {boolean} [options.antialias] - see [THREE.WebGLRenderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer)
   * @param {boolean} [options.stencil] - see [THREE.WebGLRenderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer)
   * @param {boolean} [options.preserveDrawingBuffer] - see [THREE.WebGLRenderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer)
   * @param {'high-performance'|'low-power'|'default'} [options.powerPreference] - see [THREE.WebGLRenderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer)
   * @param {boolean} [options.depth] - see [THREE.WebGLRenderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer)
   * @param {boolean} [options.logarithmicDepthBuffer] - see [THREE.WebGLRenderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer)
   */
  constructor(el, options) {
    super();

    let defaultResizeStrategy = 'canvas';

    if (el && el.tagName === 'CANVAS') {
      this.canvas = el;
    } else {
      this.canvas = document.createElement('canvas');
      if (el) {
        el.appendChild(this.canvas);
        defaultResizeStrategy = 'container';
      }
    }

    this.resizeStrategy = readOption(options, 'resizeStrategy', defaultResizeStrategy);

    this._pixelRatio = readOption(options, 'pixelRatio', 0);

    const threeParams = Object.assign({
      precision: 'mediump',
    }, filterThreeParameters(options), {
      canvas: this.canvas,
    });

    this.renderer = new THREE.WebGLRenderer(threeParams);

    const clearColor = readOption(options, 'clearColor', new THREE.Color());

    this.renderer.setClearColor(
      clearColor instanceof THREE.Color ? clearColor : new THREE.Color(clearColor),
      options.alpha ? 0 : 1,
    );

    this.resize();
  }

  /**
   * @type {number}
   */
  get pixelRatio() {
    return this._pixelRatio || window.devicePixelRatio || 1;
  }

  resize() {
    const { canvas } = this;

    const {
      clientWidth: wPx,
      clientHeight: hPx,
    } = this.resizeStrategy === 'container' ? canvas.parentNode : canvas;

    if (wPx !== this.width || hPx !== this.height) {

      this.width = wPx;
      this.height = hPx;

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

  dispatchFrameEvent(type) {
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

    this.lastNow = this.now;
    this.frameNo++;

  }

  start() {
    const renderFrame = (now) => {
      if (!this.pause) {
        this.frame(now);
      }
      this._rafID = window.requestAnimationFrame(renderFrame);
    }
    this._rafID = window.requestAnimationFrame(renderFrame);
    this.pause = false;
  }

  stop() {
    window.cancelAnimationFrame(this._rafID);
  }

}
