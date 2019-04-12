import * as THREE from 'three';

const vertexShader = `

  uniform float time;

  varying vec2 vTexCoords;

  void main(void)
  {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y + (125.0 * sin((2.0 * time) + (position.x / 300.0) + (position.z / 100.0))), position.z, 1.0);
    vTexCoords = uv;
  }

`;

const fragmentShader = `

  uniform sampler2D fontTexture;

  varying vec2 vTexCoords;

  void main(void) {
    gl_FragColor = texture2D(fontTexture, vec2(vTexCoords.s, vTexCoords.t));

    if (gl_FragColor.a == 0.0) {
      discard;
    }
  }

`;

export class BitmapFontMaterial extends THREE.ShaderMaterial {

  constructor(fontTexture: THREE.Texture) {
    super({

      vertexShader,
      fragmentShader,

      uniforms: {

        time: {
          value: 0.0,
        },

        fontTexture: {
          value: fontTexture,
        },

      },

      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: true,

    });
  }

}
