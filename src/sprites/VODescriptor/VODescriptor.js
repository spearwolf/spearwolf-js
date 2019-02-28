import { VOArray } from '../VOArray';

import createAliases from './createAliases';
import createAttributes from './createAttributes';
import createTypedArrays from './createTypedArrays';
import createVO from './createVO';
import createVOPrototype from './createVOPrototype';
import initializeVO  from './initializeVO';

export default class VODescriptor {

  /**
   * Vertex object descriptor
   *
   * @param {Object} options
   * @param {number|string} [options.vertexCount=1] - number of vertices
   * @param {Object[]} options.attributes - vertex attribute descriptions
   * @param {Object} [options.aliases] - attribute aliases
   * @param {Object} [options.methods]
   * @param {VODescriptor} [options.instanceOf]
   *
   * @example
   * const descriptor = new VODescriptor({
   *
   *     methods: {
   *         foo() {
   *             return this.voArray.float32Array[0];
   *         }
   *     },
   *
   *     // vertex buffer layout
   *     // --------------------
   *     //
   *     // v0: (x0)(y0)(z0)(rotate)(s0)(t0)(tx)(ty)(scale)(opacity)
   *     // v1: (x1)(y1)(z1)(rotate)(s1)(t1)(tx)(ty)(scale)(opacity)
   *     // v2: (x2)(y2)(z2)(rotate)(s2)(t2)(tx)(ty)(scale)(opacity)
   *     // v3: (x3)(y3)(z3)(rotate)(s3)(t3)(tx)(ty)(scale)(opacity)
   *     //
   *     vertexCount: 4,
   *
   *     attributes: [
   *
   *         { name: 'position',  type: 'float32', size: 3, scalars: [ 'x', 'y', 'z' ] },
   *         { name: 'rotate',    type: 'float32', size: 1, uniform: true },
   *         { name: 'texCoords', type: 'float32', size: 2, scalars: [ 's', 't' ] },
   *         { name: 'translate', type: 'float32', size: 2, scalars: [ 'tx', 'ty' ], uniform: true },
   *         { name: 'scale',     type: 'float32', size: 1, uniform: true },
   *         { name: 'opacity',   type: 'float32', size: 1, uniform: true }
   *
   *     ],
   *
   *     aliases: {
   *
   *         pos2d: { size: 2, type: 'float32', offset: 0 },
   *         posZ:  { size: 1, type: 'float32', offset: 2, uniform: true },
   *         r:     { size: 1, type: 'float32', offset: 3 },
   *         uv:    'texCoords',
   *
   *     }
   *
   * });
   *
   */

  constructor({ vertexCount, instanceOf, attributes, aliases, methods }) {

    /**
     * Number of vertices per vertex object
     * @type {number}
     */
    this.vertexCount = typeof vertexCount === 'number' ? vertexCount : parseInt(vertexCount, 10) || 1;

    /**
     * Returns `true` if this vertex object is *instanced*
     * @type {boolean}
     */
    this.isInstanced = instanceOf != null;

    /** @type {VODescriptor} */
    this.base = instanceOf;

    createAttributes(this, attributes);
    createAliases(this, aliases);
    createVOPrototype(this, methods);
    createTypedArrays(this);

  }

  /**
   * @param {number} [size=1]
   * @param {Object} [hints] - Optional *hints* for the `VOArray`
   * @returns {VOArray}
   */
  createVOArray(size = 1, hints = undefined) {
    // @ts-ignore
    return new VOArray(size, this.bytesPerVO, this.typeList, null, Object.assign({
      descriptor: this,
      usage: 'dynamic',
      doubleBuffer: true,
    }, hints));
  }

  /**
   * Create a *vertex object*.
   *
   * @param {VOArray} [voArray]
   * @param {function|object} [voInit] - *vertex object* initializer
   * @returns {Object} the initialized *vertex object*
   */
  createVO(voArray, voInit) {
    // @ts-ignore
    const vo = createVO(Object.create(this.voPrototype), this, voArray);

    if (voInit) {
      initializeVO(vo, voInit);
    }

    return vo;
  }

  /**
   * Check if *descriptor* has an attribute with a specific size.
   *
   * @param {string} name
   * @param {number} [size=1] - attribute items count
   * @returns {boolean}
   */
  hasAttribute(name, size = 1) {
    // @ts-ignore
    const attr = this.attr[name];
    return attr && attr.size === size;
  }

  /**
   * Max number of vertex objects when a vertex buffer is used together
   * with a indexed element array to draw primitives. the reason for
   * such a limit is that webgl restricts element array indices
   * to an uint16 data type.
   * @type {number}
   */
  get maxIndexedVOPoolSize() {
    return Math.floor(65536 / this.vertexCount);
  }
}
