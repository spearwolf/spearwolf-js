import { maxOf } from '../../math';
import { readOption, generateUuid } from '../../utils';

import { VOArray } from '../VOArray';
import { VODescriptor, VertexObject } from '../VODescriptor';

import { createVOs } from './createVOs';

export interface VOPoolOptions<T> {

  /**
   * Maximum number of vertex objects
   */
   capacity?: number;

   /**
     * A predefind vertex object array, otherwise a new one will be created
    */
   voArray?: VOArray;

   /**
    * Blueprint for unused vertex objects
    */
   voZero?: VertexObject<T>;

   /**
    * Blueprint for new vertex objects
    */
   voNew?: VertexObject<T>;

   /**
    * Never allocate more than `maxAllocVOSize` vertex objects at once.
    * Vertex objects are usually reserved in batches, not individually.
    */
   maxAllocVOSize?: number;

   /**
    * Buffer usage hint.
    * A dynamic buffer usage is assumed as default.
    */
   dynamic?: boolean;

   /**
    * Buffer usage hint.
    * If `true` then it is assumed for each frame that the content of the buffer has changed,
    * so each time the buffer is uploaded to the gpu memory again.
    * This is the default behavior for dynamic buffers.
    */
   autotouch?: boolean;

}


export class VOPool<T = Object> {

  readonly id: string;

  readonly descriptor: VODescriptor<T>;

  readonly capacity: number;

  maxAllocVOSize: number;

  voArray: VOArray;

  voZero: VertexObject<T>;
  voNew: VertexObject<T>;

  dynamic: boolean;

  readonly availableVOs: VertexObject<T>[] = [];
  readonly usedVOs: VertexObject<T>[] = [];


  constructor(descriptor: VODescriptor<T>, options: VOPoolOptions<T>) {

    this.id = generateUuid();

    this.descriptor = descriptor;

    this.capacity = readOption(options, 'capacity', this.descriptor.maxIndexedVOPoolSize) as number;

    this.maxAllocVOSize = readOption(options, 'maxAllocVOSize', 0) as number;

    this.voZero = readOption(options, 'voZero', () => descriptor.createVO()) as VertexObject<T>;
    this.voNew = readOption(options, 'voNew', () => descriptor.createVO()) as VertexObject<T>;

    this.dynamic = readOption(options, 'dynamic', true) as boolean;

    this.voArray = readOption(options, 'voArray', () => descriptor.createVOArray(this.capacity, {
      dynamic: this.dynamic,
      autotouch: readOption(options, 'autotouch', this.dynamic) as boolean,
    })) as VOArray;

    createVOs(this, this.maxAllocVOSize);

  }

  /**
   * Number of vertex objects in use
   */
  get usedCount() {
    return this.usedVOs.length;
  }

  /**
   * Number of vertex objects still available
   */
  get availableCount() {
    return this.capacity - this.usedVOs.length;
  }

  /**
   * Number of *reserved* vertex objects
   */
  get allocatedCount() {
    return this.availableVOs.length + this.usedVOs.length;
  }

  /**
   * Allocate a vertex object
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
   * Allocate multiple vertex objects at once
   */
  multiAlloc(size: number, targetArray: VertexObject<T>[] = []) {

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
   * Free vertex objects
   */
  free(vo: VertexObject<T> | VertexObject<T>[]) {

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
