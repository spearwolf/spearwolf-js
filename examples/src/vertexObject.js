/* eslint-env browser  */
/* eslint-disable no-console */
import { VERSION, VertexObject, Sprite } from '../../src';

console.log(`spearwolf.js (version: ${VERSION})`);

@VertexObject({
  attributes: [
    {
      name: 'position',
      scalars: ['x', 'y', 'z'],
    }
  ]
})
class Foo extends Sprite {

}

window.VertexObject = VertexObject;
window.Sprite = Sprite;
window.Foo = Foo;
