/* eslint-disable no-console */
import { VODescriptor } from './VODescriptor';

/**
 * A vertex object decorator.
 */
export const VertexObject = voDescriptorOptions => ({ kind, elements }) => {
  if (kind === 'class') {

    const vod = new VODescriptor(voDescriptorOptions);

    elements.push({
      kind: 'field',
      placement: 'static',
      key: 'voDescriptor',
      descriptor: {
        configurable: true,
      },
      initializer: () => vod,
    }, {
      kind: 'field',
      placement: 'static',
      key: 'createVO',
      descriptor: {
        configurable: true,
      },
      // eslint-disable-next-line object-shorthand
      initializer: () => function (voArray, initializer) {
        return new this({
          initializer,
          descriptor: vod,
          voArray: voArray || vod.createVOArray(),
        });
      }
    });

    Object.keys(vod.propertiesObject).forEach(key => {
      const descriptor = vod.propertiesObject[key];
      let field;
      if ('value' in descriptor) {
        field = {
          key,
          kind: 'field',
          placement: 'prototype',
          descriptor: {
            enumerable: Boolean(descriptor.enumerable),
          },
          initializer: () => descriptor.value,
        };
      }
      if ('get' in descriptor) {
        field = {
          key,
          kind: 'method',
          placement: 'prototype',
          descriptor: {
            enumerable: Boolean(descriptor.enumerable),
            get: descriptor.get,
            set: descriptor.set,
          }
        };
      }
      elements.push(field);
    });

    return {
      kind,
      elements,
    };

  }
};
