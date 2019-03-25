import {
  VODescriptor,
} from 'spearwolf-js';

interface Triangle {

  foo: (x: number) => number;

}

let vod = new VODescriptor<Triangle>({

  vertexCount: 3,

  methods: {

    foo(x: number) {
      return x * 2;
    }

  },

  attributes: {

    position: { scalars: ['x', 'y', 'z'], },

    color: { scalars: ['r', 'g', 'a'], }

  },

});

const triangle = vod.createVO();

let x: number;

x = triangle.foo(66);

vod = triangle.descriptor;

let numbers: number[];

numbers = triangle.toArray();
numbers = triangle.toArray(['position']);
