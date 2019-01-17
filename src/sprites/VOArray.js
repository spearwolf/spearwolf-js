import DataRef from '../utils/DataRef';

import createBufferView from './VOArray/createBufferView';
import createLinkedTypedArrays from './VOArray/createLinkedTypedArrays';

/**
 * A wrapper for an ArrayBuffer which additional holds multiple references to typed arrays.
 */
export default class VOArray {
  /**
   * Create a VOArray
   *
   * For each *array type* a property is created:
   *
   * _arrayType_:`float32` &rarr; _property_:`float32Array` &rarr; _type_:`Float32Array`
   *
   * Valid _array types_ are: `float32`, `int32`, `int16`, `int8`, `uint32`, `uint16`, `uint8`
   *
   * If `data` is defined, no new buffer is created but a *view* of the buffer passed is generated.
   *
   * @param {number} capacity - Number of `vertex objects`
   * @param {number} bytesPerVO - Size of a single `vertex object` in *bytes*. **Must be divisible by 4**.
   * @param {Array<string>} arrayTypes - List of allowed *typed array types*. Should have at least one type included.
   * @param {ArrayBuffer|DataView|TypedArray} [data] - Create a *view* into the buffer from `data`
   * @param {Object} [hints] - Optional *hints* for the *reference*
   */
  constructor(capacity, bytesPerVO, arrayTypes, data, hints) {
    if (bytesPerVO % 4 !== 0) {
      throw new TypeError(`new VOArray: bytesPerVO must be divisible by 4 (but is not!) bytesPerVO=${bytesPerVO}`);
    }

    this.capacity = capacity;
    this.bytesPerVO = bytesPerVO;
    this.arrayTypes = arrayTypes.slice(0);

    if (data) {
      const buffer = createBufferView(capacity, bytesPerVO, data);

      /** @type {ArrayBuffer} */
      this.buffer = buffer.buffer;
      this.bufferByteOffset = buffer.byteOffset;
      this.bufferByteLength = buffer.byteLength;
    } else {
      /** @type {ArrayBuffer} */
      this.buffer = new ArrayBuffer(capacity * bytesPerVO);
      this.bufferByteOffset = 0;
      this.bufferByteLength = this.buffer.byteLength;
    }

    Object.assign(this, {
      float32Array: null,
      int16Array: null,
      int32Array: null,
      int8Array: null,
      uint16Array: null,
      uint32Array: null,
      uint8Array: null,
    }, createLinkedTypedArrays(
      this.buffer,
      this.bufferByteOffset,
      this.bufferByteLength,
      arrayTypes,
    ));

    this.ref = new DataRef('VOArray', this, Object.assign({
      typedArray: this.toUint32Array(),
      serial: 1,
    }, hints));
  }

  /**
   * Copy all `vertex objects` from *source* to the internal *buffer* (destination).
   * Both *arrays* should have the same `bytesPerVO` value.
   *
   * @param {VOArray} from - Source *array*.
   * @param {number} [toOffset=0] - `vertex object` destination offset
   */
  copy(from, toOffset = 0) {
    const elementsPerVO = this.bytesPerVO / Uint32Array.BYTES_PER_ELEMENT;

    let offset = 0;

    if (toOffset > 0) {
      offset = toOffset * elementsPerVO;
    }

    this.toUint32Array().set(from.toUint32Array(), offset);
  }

  /**
   * Returns the array buffer converted to `Uint32Array`.
   * As a side-effect the `uint32Array` property will be created (if it did not exist before).
   *
   * @return {Uint32Array}
   */
  toUint32Array() {
    const { uint32Array } = this;
    if (!uint32Array) {
      const elementsPerVO = this.bytesPerVO / Uint32Array.BYTES_PER_ELEMENT;
      this.uint32Array = new Uint32Array(this.buffer, this.bufferByteOffset, this.capacity * elementsPerVO);
      return this.uint32Array;
    }
    return uint32Array;
  }

  /**
   * Create a VOArray *subarray*.
   *
   * A *subarray* is a *view* to the same underlying buffer. No data will be copied.
   *
   * @param {number} begin - Index of first `vertex object`
   * @param {number} [size=1] - Number of `vertex objects` to copy
   *
   * @return {VOArray}
   */
  subarray(begin, size = 1) {
    const { bytesPerVO, bufferByteOffset } = this;
    const byteBegin = bufferByteOffset + (begin * bytesPerVO);
    const byteLength = size * bytesPerVO;

    return new VOArray(size, bytesPerVO, this.arrayTypes, new DataView(this.buffer, byteBegin, byteLength));
  }
}
