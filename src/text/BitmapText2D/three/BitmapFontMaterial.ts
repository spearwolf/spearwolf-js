import * as THREE from 'three';

const vertexShader = `

  uniform float time;

  attribute vec4 pos;
  attribute vec4 tex;

  attribute float zPos;
  attribute float baselineOffset;

  varying vec2 vTexCoords;

  void main(void)
  {
    vec3 p = vec3(pos.x + (position.x * pos.z), pos.y + (position.y * pos.w) + baselineOffset, zPos);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p.x, p.y + (125.0 * sin((2.0 * time) + (p.x / 300.0) + (p.z / 100.0))), p.z, 1.0);;

    vTexCoords = vec2(tex.x + (uv.x * tex.z), tex.y + (uv.y * tex.w));
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
