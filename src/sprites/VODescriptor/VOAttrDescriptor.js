/* eslint no-param-reassign: 0 */
/* eslint func-names: 0 */
/* eslint prefer-rest-params: 0 */
import {
  BYTES_PER_ELEMENT,
  TYPED_ARRAY_GETTER,
} from './typedArrayHelpers';

/**
 * @private
 * @param {string} name
 * @returns {string}
 */
const camelize = name => name[0].toUpperCase() + name.substr(1);

/**
 * @private
 * @param {VOAttrDescriptor} attrDesc
 * @param {string} name
 * @param {number} index
 * @returns {string}
 */
const attrPostfix = (attrDesc, name, index) => {
  if (attrDesc.scalars) {
    const postfix = attrDesc.scalars[index];

    if (postfix !== undefined) {
      return postfix;
    }
  }

  return `${name}_${index}`;
};

/** @private */
const getVNu = (getArray, offset) => function (attrIndex) {
  return getArray(this.voArray)[offset + attrIndex];
};

/** @private */
const setVNu = (getArray, vectorLength, vertexCount, vertexAttrCount, offset) => function () {
  const arr = getArray(this.voArray);

  for (let i = 0; i < vertexCount; ++i) {
    for (let n = 0; n < vectorLength; ++n) {
      arr[(i * vertexAttrCount) + offset + n] = arguments[n];
    }
  }
};

/** @private */
const getV1u = (getArray, offset) => function () {
  return getArray(this.voArray)[offset];
};

/** @private */
const setVNv = (getArray, vectorLength, vertexCount, vertexAttrCount, offset) => function () {
  const arr = getArray(this.voArray);

  for (let i = 0; i < vertexCount; ++i) {
    for (let n = 0; n < vectorLength; ++n) {
      arr[(i * vertexAttrCount) + offset + n] = arguments[(i * vectorLength) + n];
    }
  }
};

/** @private */
const setV1u = (getArray, vertexCount, vertexAttrCount, offset) => function (value) {
  const arr = getArray(this.voArray);

  for (let i = 0; i < vertexCount; ++i) {
    arr[(i * vertexAttrCount) + offset] = value;
  }
};

/**
 * Vertex object attribute descriptor
 */
export default class VOAttrDescriptor {

  /**
   * @param {string} name
   * @param {'float32'|'int16'|'int32'|'int8'|'uint16'|'uint32'|'uint8'} type
   * @param {number} size
   * @param {number} [offset] - either `offset` or `byteOffset` must be specified
   * @param {number} [byteOffset] - either `offset` or `byteOffset` must be specified
   * @param {boolean} uniform
   * @param {string[]} [scalars]
   */
  constructor(name, type, size, offset, byteOffset, uniform, scalars) {

    /** @type {string} */
    this.name = name;

    /** @type {'float32'|'int16'|'int32'|'int8'|'uint16'|'uint32'|'uint8'} */
    this.type = type;

    /** @type {number} */
    this.size = size;

    /** @type {boolean} */
    this.uniform = uniform;

    /** @type {string[]} */
    this.scalars = scalars;

    /** @type {number} */
    this.bytesPerElement = BYTES_PER_ELEMENT[this.type];

    /** @type {number} */
    this.bytesPerVertex = this.bytesPerElement * size;

    /** @type {number} */
    this.byteOffset = typeof byteOffset !== 'number' ? offset * this.bytesPerElement : byteOffset;

    /** @type {number} */
    this.offset = typeof offset !== 'number' ? byteOffset / this.bytesPerElement : offset;

  }

  /**
   * Number of attributes per vertex
   * @returns {number}
   */
  vertexAttrCount(descriptor) {
    return descriptor.bytesPerVertex / this.bytesPerElement;
  }

  /**
   * @private
   */
  static defineProperties(attrDesc, propertiesObject, descriptor) {
    const { name } = attrDesc;
    const getArray = TYPED_ARRAY_GETTER[attrDesc.type];
    const { vertexCount } = descriptor;
    const vertexAttrCount = attrDesc.vertexAttrCount(descriptor);
    const offset = attrDesc.byteOffset / attrDesc.bytesPerElement;

    if (attrDesc.size === 1) {
      if (attrDesc.uniform) {
        const valueGetter = getV1u(getArray, offset);
        const valueSetter = setV1u(getArray, vertexCount, vertexAttrCount, offset);

        attrDesc.getValue = vo => valueGetter.call(vo);
        attrDesc.setValue = (vo, arg) => valueSetter.call(vo, arg);

        propertiesObject[name] = {
          get: valueGetter,
          set: valueSetter,
          enumerable: true,
        };
      } else {
        const valueSetter = setVNv(getArray, 1, vertexCount, vertexAttrCount, offset);

        attrDesc.setValue = (vo, args) => valueSetter.apply(vo, args);

        propertiesObject[`set${camelize(name)}`] = {
          value: valueSetter,
          enumerable: true,
        };

        const valueGetters = [];

        for (let i = 0; i < descriptor.vertexCount; ++i) {
          const curValueGetter = getV1u(getArray, offset + (i * vertexAttrCount));

          valueGetters.push(curValueGetter);

          propertiesObject[name + i] = {
            get: curValueGetter,
            set: setVNv(getArray, 1, 1, 0, offset + (i * vertexAttrCount)),
            enumerable: true,
          };
        }

        attrDesc.getValue = (vo, vi) => valueGetters[vi].call(vo);
      }
    } else if (attrDesc.size >= 2) {
      if (attrDesc.uniform) {
        const valueGetter = getVNu(getArray, offset);
        const valueSetter = setVNu(getArray, attrDesc.size, vertexCount, vertexAttrCount, offset);

        attrDesc.getValue = (vo, vi, idx) => valueGetter.call(vo, idx);
        attrDesc.setValue = (vo, args) => valueSetter.apply(vo, args);

        propertiesObject[`get${camelize(name)}`] = {
          value: valueGetter,
          enumerable: true,
        };

        propertiesObject[`set${camelize(name)}`] = {
          value: valueSetter,
          enumerable: true,
        };

        for (let i = 0; i < attrDesc.size; ++i) {
          const setterName = attrPostfix(attrDesc, name, i);

          propertiesObject[setterName] = {
            get: getV1u(getArray, offset + i),
            set: setV1u(getArray, vertexCount, vertexAttrCount, offset + i),
            enumerable: true,
          };
        }
      } else {
        const valueSetter = setVNv(getArray, attrDesc.size, vertexCount, vertexAttrCount, offset);

        attrDesc.setValue = (vo, args) => valueSetter.apply(vo, args);

        propertiesObject[`set${camelize(name)}`] = {
          value: valueSetter,
          enumerable: true,
        };

        const valueGetters = [];

        for (let i = 0; i < descriptor.vertexCount; ++i) {
          const curVertexValueGetters = [];

          for (let j = 0; j < attrDesc.size; ++j) {
            const setterName = attrPostfix(attrDesc, name, j) + i;
            const curValueGetter = getV1u(getArray, offset + (i * vertexAttrCount) + j);

            curVertexValueGetters.push(curValueGetter);

            propertiesObject[setterName] = {
              get: curValueGetter,
              set: setVNv(getArray, 1, 1, 0, offset + (i * vertexAttrCount) + j),
              enumerable: true,
            };
          }

          valueGetters.push(curVertexValueGetters);
        }

        attrDesc.getValue = (vo, vi, idx) => valueGetters[vi][idx].call(vo);
      }
    }
  }
}
