import * as THREE from 'three';

import { SpriteGroupMesh, SpriteGroupInstancedBufferGeometry } from '../three';
import { TextureAtlas, Texture } from '../textures';

import { BitmapCharGroup, BitmapCharGroupOptions } from './BitmapCharGroup';
import { BitmapCharMethodsType } from './BitmapCharMethods';
import { BitmapFontMaterial } from './BitmapFontMaterial';
import { IBitmapChar } from './IBitmapChar';
import { BitmapCharBaseGroup } from './BitmapCharBaseGroup';
import { BitmapCharBaseMethodsType } from './BitmapCharBaseMethods';
import { IBitmapCharBase } from './IBitmapCharBase';

function makeTexture(htmlElement: HTMLImageElement) {

  const texture = new THREE.Texture(htmlElement);

  texture.flipY = false;
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;

  return texture;

}

export interface BitmapText2DOptions extends BitmapCharGroupOptions {
}

interface ISpriteChar {

  tex: Texture;

  x: number;
  y: number;

  /**
   * baseline offset
   */
  bo: number;

}

interface ITextLine {

  lineWidth: number;

  chars: ISpriteChar[];

}

export interface IBitmapText2DMeasurement {

  height: number;
  maxLineWidth: number;
  charCount: number;

  lines: ITextLine[];

}

export enum BitmapText2DAlignment {
  Left = 0,
  Center = 1,
  Right = 2,
}

export class BitmapText2D extends SpriteGroupMesh<BitmapCharMethodsType, IBitmapChar, BitmapCharBaseMethodsType, IBitmapCharBase> {

  fontAtlas: TextureAtlas;
  baseChars: BitmapCharBaseGroup;
  bitmapChars: BitmapCharGroup;
  material: BitmapFontMaterial;

  lineHeight: number;
  hSpacing: number;
  whiteSpaceWidth: number;

  constructor(fontAtlas: TextureAtlas, options?: BitmapText2DOptions) {

    const baseChars = new BitmapCharBaseGroup({ capacity: 1, dynamic: false });
    const bitmapCharGroup = new BitmapCharGroup(options);
    const geometry = new SpriteGroupInstancedBufferGeometry(baseChars, bitmapCharGroup);
    const material = new BitmapFontMaterial(makeTexture(fontAtlas.baseTexture.imgEl as HTMLImageElement));

    super(geometry, material);

    this.fontAtlas = fontAtlas;
    this.baseChars = baseChars;
    this.bitmapChars = bitmapCharGroup;
    this.material = material;

    this.type = 'BitmapText2D';

    this.baseChars.createSprite(1, 1).setUv(0, 0, 1, 0, 1, 1, 0, 1); // TODO re-use a cached/global instance here?

    this.lineHeight = fontAtlas.getFeature('lineHeight') as number;
    this.hSpacing = fontAtlas.getFeature('hSpacing') as number || 1;
    this.whiteSpaceWidth = fontAtlas.getFeature('whiteSpaceWidth') as number;

  }

  drawText(text: string, x: number, y: number, z: number, maxWidth = 0.0, align: BitmapText2DAlignment = BitmapText2DAlignment.Left) {
    this.createText(this.measureText(text, maxWidth), x, y, z, align);
  }

  createText(measure: IBitmapText2DMeasurement, x: number, y: number, z: number, align: BitmapText2DAlignment) {

    for (let i = 0; i < measure.lines.length; i++) {

      const line = measure.lines[i];

      let lineX = x;

      if (align === BitmapText2DAlignment.Center) {
        lineX -= line.lineWidth / 2.0;
      } else if (align === BitmapText2DAlignment.Right) {
        lineX -= line.lineWidth;
      }

      for (let j = 0; j < line.chars.length; j++) {

        const char = line.chars[j];

        const sprite = this.bitmapChars.createSpriteByTexture(char.tex);
        sprite.baselineOffset0 = char.bo;

        sprite.translate(lineX + char.x, y + measure.height - char.y, z);

      }

    }

  }

  measureText(text: string, maxWidth = 0.0): IBitmapText2DMeasurement {

    const len = text.length;

    const lines: ITextLine[] = [{ lineWidth: 0, chars: [] }];
    let chars: ITextLine = lines[0];

    let charCount = 0;

    let cursor = { x: 0, y: 0 };

    let maxLineWidth = 0;
    let lineWidth = 0;

    const makeNewLine = () => {

      cursor.x = 0;
      cursor.y += this.lineHeight;

      chars.lineWidth = lineWidth;

      chars = { lineWidth: 0, chars: [] };
      lines.push(chars);

      if (lineWidth > maxLineWidth) {
        maxLineWidth = lineWidth;
      }

      lineWidth = 0;

    };

    for (let i = 0; i < len; i++) {

      const c = text[i];

      if (c === ' ') {

        cursor.x += this.whiteSpaceWidth;

        if (maxWidth > 0 && cursor.x >= maxWidth) {
          makeNewLine();
        }

      } else if (c === '\n') {

        makeNewLine();

      } else {

        const tex = this.fontAtlas.frame(c);
        const { width } = tex;
        const baselineOffset = tex.getFeature('baselineOffset') as number || 0;

        if (maxWidth > 0  && (cursor.x + width) >= maxWidth) {
          makeNewLine();
        }

        chars.chars.push({ tex, x: cursor.x, y: cursor.y, bo: baselineOffset });
        ++charCount;

        lineWidth = cursor.x + width;

        cursor.x += width + this.hSpacing;

      }

    }

    chars.lineWidth = lineWidth;

    if (lineWidth > maxLineWidth) {
      maxLineWidth = lineWidth;
    }

    return {

      lines,
      maxLineWidth,
      charCount,

      height: lines.length * this.lineHeight,

    };

  }

}
