
/**
 * @private
 */
const TYPED_ARRAY = {
  float32: Float32Array,
  int16: Int16Array,
  int32: Int32Array,
  int8: Int8Array,
  uint16: Uint16Array,
  uint32: Uint32Array,
  uint8: Uint8Array,
};

/**
 * @private
 */
const typedArrayProp = type => `${type}Array`;

/**
 * @private
 */
export default (buffer, bufferByteOffset, bufferByteLength, arrayTypes) => {
  const typedArrays = {};

  arrayTypes.forEach((type) => {
    const TypedArray = TYPED_ARRAY[type];
    const arr = new TypedArray(buffer, bufferByteOffset, bufferByteLength / TypedArray.BYTES_PER_ELEMENT);
    typedArrays[typedArrayProp(type)] = arr;
  });

  return typedArrays;
};
