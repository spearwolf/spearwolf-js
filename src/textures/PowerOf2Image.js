/* eslint-env browser */
import { findNextPowerOf2, isPowerOf2 } from '../math';

const convertToPowerOf2 = (image) => {
  const w = findNextPowerOf2(image.width);
  const h = findNextPowerOf2(image.height);

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  canvas.getContext('2d').drawImage(image, 0, 0);

  return canvas;
};

export class PowerOf2Image {

  loaded = null;

  imgEl = null;

  origWidth = 0;
  origHeight = 0;

  constructor(from) {
    let imgEl;
    let waitUntilLoading = false;
    if (typeof from === 'string') {
      imgEl = new Image();
      imgEl.src = from;
      waitUntilLoading = true;
    } else {
      imgEl = from;
    }
    const imageHasValidSize = imgEl.width > 0 && imgEl.height > 0;
    if (waitUntilLoading || !imageHasValidSize) {
      this.imgEl = null;
      this.loaded = new Promise((resolve) => {
        const origOnLoad = imgEl.onload;
        imgEl.onload = () => {
          if (origOnLoad) { origOnLoad.call(imgEl); }
          this.setImgEl(imgEl);
          resolve(this);
        };
      });
    } else {
      this.setImgEl(imgEl);
      this.loaded = Promise.resolve(this);
    }
  }

  get isLoaded() {
    return this.imgEl != null;
  }

  get width() {
    return (this.imgEl && this.imgEl.width) || 0;
  }

  get height() {
    return (this.imgEl && this.imgEl.height) || 0;
  }

  setImgEl(imgEl) {
    this.imgEl = isPowerOf2(imgEl.width) && isPowerOf2(imgEl.height) ? imgEl : convertToPowerOf2(imgEl);
    this.origWidth = imgEl.width;
    this.origHeight = imgEl.height;
  }
}
