/* eslint func-names: 0 */
/* eslint no-param-reassign: 0 */
import VOAttrDescriptor from './VOAttrDescriptor';
import { toArray } from './toArray';

/**
 * @private
 */
export default (descriptor, methods = {}) => {
  const propertiesObject = {
    toArray: {
      value: toArray(descriptor),
    },
  };

  Object.keys(descriptor.attr).forEach((name) => {
    const attr = descriptor.attr[name];
    VOAttrDescriptor.defineProperties(attr, propertiesObject, descriptor);
  });

  descriptor.propertiesObject = propertiesObject;
  descriptor.voPrototype = Object.create(methods, propertiesObject);
};
