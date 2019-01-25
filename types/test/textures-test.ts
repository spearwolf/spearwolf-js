import {
  ImageSource,
} from '../textures';

import {
  PowerOf2Image,
} from 'spearwolf-js';

let p2 = new PowerOf2Image('foo.png');
p2 = new PowerOf2Image(new Image());
p2 = new PowerOf2Image(new HTMLImageElement());
p2 = new PowerOf2Image(new HTMLCanvasElement());
p2 = new PowerOf2Image(new HTMLVideoElement());

let b: boolean = p2.isLoaded;

let el: ImageSource;
el = p2.imgEl;

let w: number;
let h: number;

p2.onLoaded.then((img: PowerOf2Image) => {

  w = img.width;
  h = img.height;

  b = w === img.origWidth && h === img.origWidth;

});
