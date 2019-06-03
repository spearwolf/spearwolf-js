
/**
 * See [THREE.WebGLRenderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer)
 */
export interface ThreeWebGLRendererOptions {
  /**
   * Default is `mediump`.
   */
  precision?: 'highp' | 'mediump' | 'lowp';
  alpha?: boolean;
  premultipliedAlpha?: boolean;
  antialias?: boolean;
  stencil?: boolean;
  preserveDrawingBuffer?: boolean;
  powerPreference?: 'high-performance' | 'low-power' | 'default';
  depth?: boolean;
  logarithmicDepthBuffer?: boolean;
}
