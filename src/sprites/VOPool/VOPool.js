/* eslint no-param-reassign: 0 */
import { readOption, generateUuid } from '../../utils';
import { maxOf } from '../../math';

import createVOs from './createVOs';

/**
 * @typedef {import("../VODescriptor").VODescriptor} VODescriptor
 */

/**
 * @typedef {import("../VOArray").VOArray} VOArray
 */

/**
 * @typedef VertexObject 
 * @property {VOArray} voArray
 */

export default class VOPool {

  /**
   * @param {VODescriptor} descriptor - vertex object descriptor
   * @param {Object} [options] - Advanced options
   * @param {number} [options.capacity] - Maximum number of *vertex objects*
   * @param {VOArray} [options.voArray] - A predefind vertex object array, otherwise a new one will be created
   * @param {VertexObject} [options.voZero] - *vertex object* blueprint
   * @param {VertexObject} [options.voNew] - *vertex object* blueprint
   * @param {number} [options.maxAllocVOSize] - never allocate more than `maxAllocVOSize` *vertex objects* at once
   * @param {boolean} [options.dynamic=true] - buffer usage hint, choose between `dynamic` (true) or `static` (false)
   * @param {boolean} [options.autotouch] - auto touch vertex buffers hint, set to `true` (which is the default if buffer usage hint is `dynamic`) or `false`.
   */

  constructor(descriptor, options) {

    /**
     * @readonly
     * @type {string}
     */
    this.id = generateUuid();

    /**
     * @readonly
     * @type {VODescriptor}
     */
    this.descriptor = descriptor;

    /**
     * @readonly
     * @type {number}
     */
    this.capacity = readOption(options, 'capacity', this.descriptor.maxIndexedVOPoolSize);

    /**
     * @type {number}
     */
    this.maxAllocVOSize = readOption(options, 'maxAllocVOSize', 0);

    /**
     * @type {VertexObject}
     */
    this.voZero = readOption(options, 'voZero', () => descriptor.createVO());

    /**
     * @type {VertexObject}
     */
    this.voNew = readOption(options, 'voNew', () => descriptor.createVO());

    /**
     * @readonly
     * @type {boolean}
     */
    this.dynamic = readOption(options, 'dynamic', true);

    /**
     * @type {VOArray}
     */
    this.voArray = readOption(options, 'voArray', () => descriptor.createVOArray(this.capacity, {
      dynamic: this.dynamic,
      autotouch: readOption(options, 'autotouch', this.dynamic),
    }));

    /**
     * @readonly
     * @type {VertexObject[]}
     */
    this.availableVOs = [];

    /**
     * @readonly
     * @type {VertexObject[]}
     */
    this.usedVOs = [];

    createVOs(this, this.maxAllocVOSize);

  }

  /**
   * Number of in-use *vertex objects*.
   * @type {number}
   */

  get usedCount() {
    return this.usedVOs.length;
  }

  /**
   * Number of free-and-unused *vertex objects*.
   * @type {number}
   */

  get availableCount() {
    return this.capacity - this.usedVOs.length;
  }

  /**
   * Number of **allocated** *vertex objects*.
   * @type {number}
   */

  get allocatedCount() {
    return this.availableVOs.length + this.usedVOs.length;
  }

  /**
   * Allocate a single *vertex object*
   * @return {VertexObject}
   */

  alloc() {
    let vo = this.availableVOs.shift();

    if (vo === undefined) {
      if ((this.capacity - this.allocatedCount) > 0) {
        createVOs(this, this.maxAllocVOSize);
        vo = this.availableVOs.shift();
      } else {
        return;
      }
    }

    this.usedVOs.push(vo);
    vo.voArray.copy(this.voNew.voArray);

    return vo;
  }

  /**
   * Allocate multiple *vertex objects* at once
   * @return {VertexObject[]}
   */

  multiAlloc(size, targetArray = []) {
    if ((this.allocatedCount - this.usedCount) < size) {
      createVOs(this, maxOf(this.maxAllocVOSize, size - this.allocatedCount - this.usedCount));
    }
    for (let i = 0; i < size; ++i) {
      const vo = this.availableVOs.shift();
      if (vo !== undefined) {
        this.usedVOs.push(vo);
        vo.voArray.copy(this.voNew.voArray);
        targetArray.push(vo);
      } else {
        break;
      }
    }
    return targetArray;
  }

  /**
   * @param {VertexObject|VertexObject[]} vo - vertex object(s)
   */

  free(vo) {
    if (Array.isArray(vo)) {
      for (let i=0, len=vo.length; i < len; ++i) {
        this.free(vo[i]);
      }
      return;
    }

    const idx = this.usedVOs.indexOf(vo);

    if (idx === -1) return;

    const lastIdx = this.usedVOs.length - 1;

    if (idx !== lastIdx) {
      const last = this.usedVOs[lastIdx];
      vo.voArray.copy(last.voArray);

      const tmp = last.voArray;
      last.voArray = vo.voArray;
      vo.voArray = tmp;

      this.usedVOs.splice(idx, 1, last);
    }

    this.usedVOs.pop();
    this.availableVOs.unshift(vo);

    vo.voArray.copy(this.voZero.voArray);
  }
}
