declare module "colors/hexCol2rgb" {
    /**
     * Returns an array containing 3x values: *red*, *green*, *blue* with each color value in range of [0..255]
     * @param hexColor - css color hex string (with or without leading '#')
     */
    export const hexCol2rgb: (hexColor: string) => number[];
}
declare module "colors/hexCol2rgba" {
    /**
     * Returns an array containing 3x values: *red*, *green*, *blue*, *alpha* with each color value in range of [0..255]
     * @param hexColor - css color hex string (with or without leading '#')
     * @param alpha - alpha value in range [0..255]
     */
    export const hexCol2rgba: (hexColor: string, alpha?: number) => number[];
}
declare module "colors/toFloatColors" {
    /**
     * Converts an array containing (3-4)x color values [0..255] to float values [0..1]
     * @returns a new array, the old one will be untouched
     */
    export const toFloatColors: (colors: number[]) => number[];
}
declare module "utils/generateUuid" {
    /**
     * @returns a random v4 [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) of the form `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`
     * @see https://gist.github.com/jed/982883
     */
    export const generateUuid: () => any;
}
declare module "utils/get" {
    /**
     * A rough and unpolished version of lodash's `get()`
     * @param path - The property path. Supports `.` (dots) and `[1]` (array access) syntax.
     */
    export const get: (obj: Object, path: string) => unknown;
}
declare module "utils/pick" {
    export const pick: <T extends Object>(names: string[]) => (obj?: Object) => T;
}
declare module "utils/readOption" {
    export const readOption: (options: any, propName: string, defValue?: any, funcArgs?: any) => unknown;
}
declare module "utils/sample" {
    export const sample: <T>(arr: T[]) => T;
}
declare module "utils/unpick" {
    export const unpick: <T extends Object>(names: string[]) => (obj?: Object) => T;
}
declare module "core/DataRef" {
    export interface DataRefHints {
        id?: number | string;
        serial?: number;
        [key: string]: any;
    }
    /**
     * Generic data reference with a *type* and *serial number*.
     *
     * Each time you are setting the `data` property to a new value, the serial number will be increased.
     * Use `.touch()` if you want to increase the serial number without changing the value.
     *
     */
    export class DataRef<T> {
        readonly type: number | string;
        readonly id: number | string;
        serial: number;
        private _data;
        private _hints;
        constructor(type: number | string, data: T, hints?: DataRefHints);
        data: T;
        touch(): void;
        /**
         * @returns `true` if *serial* is greater than 0 and equals to *serial* from `otherRef`
         */
        isSynced(otherRef: DataRef<any>): boolean;
        /**
         * @returns the opposite of `isSynced()`
         */
        needSync(otherRef: DataRef<any>): boolean;
        /**
         * @param {DataRef} otherRef
         * @param {function} callbackFn
         */
        sync(otherRef: DataRef<any>, callbackFn: (data: T) => void): void;
        /**
         * Returns `true` if a hint exists and the hint value is as expected.
         * If you leave out the expected value (call the method with just one argument)
         * the methods just ckecks if the hint exists (regardless ofthe value).
         */
        hasHint(hintKey: string, expectedValue?: any): boolean;
        /**
         * Returns a hint value.
         */
        hint(hintKey: string): any;
    }
}
declare module "math/AABB2" {
    /**
     * Represents a 2D axis aligned boundary box.
     * Uses a right-handed coordinate system.
     */
    export class AABB2 {
        left: number;
        top: number;
        width: number;
        height: number;
        constructor(left: number, top: number, width: number, height: number);
        clone(): AABB2;
        readonly right: number;
        readonly bottom: number;
        readonly centerX: number;
        readonly centerY: number;
        /**
         * @returns `true` if point is within
         */
        isInside(x: number, y: number): boolean;
        /**
         * @returns `true` if the two overlap
         */
        isIntersecting(aabb: AABB2): boolean;
        isNorthWest(x: number, y: number): boolean;
        isNorthEast(x: number, y: number): boolean;
        isSouthEast(x: number, y: number): boolean;
        isSouthWest(x: number, y: number): boolean;
    }
}
declare module "math/findNextPowerOf2" {
    export const findNextPowerOf2: (x: number) => number;
}
declare module "math/isPowerOf2" {
    export const isPowerOf2: (n: number) => boolean;
}
declare module "math/makeCircleCoords" {
    type CircleCoordsFn = (x: number, y: number, z: number) => void;
    export const makeCircleCoords: (steps: number, radius?: number, circleCoordsFn?: CircleCoordsFn) => [number, number, number][];
}
declare module "math/maxOf" {
    export const maxOf: (a: number, b: number) => number;
}
declare module "shaders/ShaderTool" {
    export function add(a: string | number, b: string | number): string | number;
    export function sub(a: string | number, b: string | number): string | number;
    export function mul(a: string | number, b: string | number): string | number;
    export function asFloat(number: string | number): string;
    export const ret: (res: string) => string;
    export function mat4(m00?: string | number, m01?: string | number, m02?: string | number, m03?: string | number, m10?: string | number, m11?: string | number, m12?: string | number, m13?: string | number, m20?: string | number, m21?: string | number, m22?: string | number, m23?: string | number, m30?: string | number, m31?: string | number, m32?: string | number, m33?: string | number, as?: typeof asFloat): string;
    export const rotate: (funcName?: string, x?: number, y?: number, z?: number) => string;
    export const rotateZ: (funcName?: string) => string;
}
declare module "sprites/VODescriptor/typedArrayHelpers" {
    export const BYTES_PER_ELEMENT: {
        float32: number;
        int16: number;
        int32: number;
        int8: number;
        uint16: number;
        uint32: number;
        uint8: number;
    };
    export const TYPED_ARRAY_CONSTRUCTOR: {
        float32: Float32ArrayConstructor;
        int16: Int16ArrayConstructor;
        int32: Int32ArrayConstructor;
        int8: Int8ArrayConstructor;
        uint16: Uint16ArrayConstructor;
        uint32: Uint32ArrayConstructor;
        uint8: Uint8ArrayConstructor;
    };
    export const TYPED_ARRAY_GETTER: {
        float32: (obj: {
            float32Array: Float32Array;
        }) => Float32Array;
        int32: (obj: {
            int32Array: Int32Array;
        }) => Int32Array;
        int16: (obj: {
            int16Array: Int16Array;
        }) => Int16Array;
        int8: (obj: {
            int8Array: Int8Array;
        }) => Int8Array;
        uint32: (obj: {
            uint32Array: Uint32Array;
        }) => Uint32Array;
        uint16: (obj: {
            uint16Array: Uint16Array;
        }) => Uint16Array;
        uint8: (obj: {
            uint8Array: Uint8Array;
        }) => Uint8Array;
    };
    export const GL_ITEM_TYPES: {
        float32: string;
        int16: string;
        int32: string;
        int8: string;
        uint16: string;
        uint32: string;
        uint8: string;
    };
}
declare module "sprites/VODescriptor/VOAttrDescriptor" {
    export type VOArrayValueType = 'float32' | 'int16' | 'int32' | 'int8' | 'uint16' | 'uint32' | 'uint8';
    /**
     * Vertex object attribute descriptor
     */
    export class VOAttrDescriptor {
        name: string;
        type: VOArrayValueType;
        size: number;
        uniform: boolean;
        scalars: string[];
        bytesPerElement: number;
        bytesPerVertex: number;
        byteOffset: number;
        offset: number;
        /**
         * @param offset - either `offset` or `byteOffset` must be specified
         * @param byteOffset - either `offset` or `byteOffset` must be specified
         */
        constructor(name: string, type: VOArrayValueType, size: number, offset: number | undefined, byteOffset: number | undefined, uniform: boolean, scalars?: string[]);
        /**
         * Number of attributes per vertex
         */
        vertexAttrCount(descriptor: {
            bytesPerVertex: number;
        }): number;
        static defineProperties(attrDesc: any, propertiesObject: any, descriptor: any): void;
    }
}
declare module "sprites/VODescriptor/createAliases" {
    import { VODescriptor } from "sprites/VODescriptor/VODescriptor";
    export const createAliases: (descriptor: VODescriptor<Object>, aliases: any) => void;
}
declare module "sprites/VODescriptor/createAttributes" {
    import { VODescriptor, VOAttributesDescription } from "sprites/VODescriptor/VODescriptor";
    export const createAttributes: (descriptor: VODescriptor<Object>, attributesOrObject: VOAttributesDescription) => void;
}
declare module "sprites/VODescriptor/createTypedArrays" {
    import { VODescriptor } from "sprites/VODescriptor/VODescriptor";
    export function createTypedArrays(descriptor: VODescriptor): void;
}
declare module "sprites/VODescriptor/createVO" {
    export function createVO(obj: any, descriptor: any, voArray: any): any;
}
declare module "sprites/VODescriptor/toArray" {
    export const toArray: (descriptor: any) => (scalars: string[]) => any[];
}
declare module "sprites/VODescriptor/createVOPrototype" {
    export function createVOPrototype(descriptor: any, methods?: {}): void;
}
declare module "sprites/VODescriptor/initializeVO" {
    export function initializeVO(vertexObject: any, initializer: any): void;
}
declare module "sprites/VODescriptor/VODescriptor" {
    import { VOArray, VOArrayHints } from '../VOArray';
    import { VOAttrDescriptor } from "sprites/VODescriptor/VOAttrDescriptor";
    type VOAttrDataType = 'float32' | 'int16' | 'int32' | 'int8' | 'uint16' | 'uint32' | 'uint8';
    export interface VOAttrDescription {
        name: string;
        type?: VOAttrDataType;
        size?: number;
        uniform?: boolean;
        scalars?: string[];
    }
    interface VOAttrsMap {
        [attrName: string]: VOAttrDescription;
    }
    export type VOAttributesDescription = VOAttrsMap | Array<VOAttrDescription>;
    interface VODescription<T> {
        vertexCount?: number;
        methods?: T;
        attributes: VOAttributesDescription;
        aliases?: any;
    }
    type toArrayFn = (attrList: string[]) => number[];
    interface VertexObjectMethods<T> {
        descriptor: VODescriptor<T>;
        voArray: VOArray;
        toArray: toArrayFn;
    }
    type VertexObject<T> = T & VertexObjectMethods<T>;
    type VOInitializerFn<T> = (vo: VertexObject<T>) => void;
    type VOInitializer<T> = Object | VOInitializerFn<T>;
    /**
     * Vertex object descriptor
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
    export class VODescriptor<T = Object> {
        /**
         * Number of vertices per vertex object
         */
        vertexCount: number;
        /**
         * Number of attributes per vertex
         */
        vertexAttrCount: number;
        bytesPerVO: number;
        bytesPerVertex: number;
        rightPadBytesPerVertex: number;
        typeList: VOAttrDataType[];
        attr: {
            [attrName: string]: VOAttrDescriptor;
        };
        scalars: string[];
        attrList: VOAttrDescription[];
        typedArrays: {
            float32: boolean;
            int16: boolean;
            int32: boolean;
            int8: boolean;
            uint16: boolean;
            uint32: boolean;
            uint8: boolean;
        };
        constructor({ vertexCount, attributes, aliases, methods }: VODescription<T>);
        createVOArray(size?: number, hints?: VOArrayHints): VOArray;
        /**
         * Create a new *vertex object*.
         *
         * @returns the initialized *vertex object* instance
         */
        createVO(voArray: VOArray, voInit?: VOInitializer<T>): VertexObject<T>;
        /**
         * Check if *descriptor* has an attribute with a specific size.
         *
         * @param size - attribute items count
         */
        hasAttribute(name: string, size?: number): boolean;
        /**
         * Max number of vertex objects when a vertex buffer is used together
         * with a indexed element array to draw primitives. the reason for
         * such a limit is that webgl restricts element array indices
         * to an uint16 data type.
         */
        readonly maxIndexedVOPoolSize: number;
    }
}
declare module "sprites/VOArray/createBufferView" {
    export const createBufferView: (capacity: number, bytesPerVO: number, data: BufferSource) => DataView;
}
declare module "sprites/VOArray/createLinkedTypedArrays" {
    export type ArrayDataType = "float32" | "int32" | "int16" | "int8" | "uint32" | "uint16" | "uint8";
    export interface TypedArrays {
        float32Array?: Float32Array;
        int16Array?: Int16Array;
        int32Array?: Int32Array;
        int8Array?: Int8Array;
        uint16Array?: Uint16Array;
        uint32Array?: Uint32Array;
        uint8Array?: Uint8Array;
    }
    export const createLinkedTypedArrays: (buffer: ArrayBuffer, bufferByteOffset: number, bufferByteLength: number, arrayTypes: import("sprites/VODescriptor/VOAttrDescriptor").VOArrayValueType[]) => TypedArrays;
}
declare module "sprites/VOArray/VOArray" {
    import { DataRef } from '../../core';
    import { VODescriptor } from '../VODescriptor';
    import { ArrayDataType } from "sprites/VOArray/createLinkedTypedArrays";
    type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array;
    export interface VOArrayHints {
        dynamic?: boolean;
        autotouch?: boolean;
        serial?: number;
        descriptor?: VODescriptor;
        typedArray?: Uint32Array;
    }
    /**
     * A wrapper for an ArrayBuffer which additional holds multiple references to typed arrays.
     */
    export class VOArray {
        capacity: number;
        bytesPerVO: number;
        arrayDataTypes: ArrayDataType[];
        buffer: ArrayBuffer;
        bufferByteOffset: number;
        bufferByteLength: number;
        ref: DataRef<VOArray>;
        float32Array: Float32Array;
        int16Array: Int16Array;
        int32Array: Int32Array;
        int8Array: Int8Array;
        uint16Array: Uint16Array;
        uint32Array: Uint32Array;
        uint8Array: Uint8Array;
        /**
         * Represents an array buffer for vertex objects.
         *
         * For each *array type* a property is created:
         *
         * _arrayType_:`float32` &rarr; _property_:`float32Array` &rarr; _type_:`Float32Array`
         *
         * Supported _array types_ are: `float32`, `int32`, `int16`, `int8`, `uint32`, `uint16`, `uint8`
         *
         * If `data` is defined, no new buffer is created but a *view* into the buffer passed is generated.
         *
         * @param capacity - Number of `vertex objects`
         * @param bytesPerVO - Size of a single `vertex object` in *bytes*. **Must be divisible by 4**.
         * @param arrayDataTypes - List of allowed *typed array types*. Should have at least one type included.
         * @param data - Create a *view* into the buffer from `data`
         * @param hints - Optional *hints* for the *reference* `VOArray.ref`
         */
        constructor(capacity: number, bytesPerVO: number, arrayDataTypes: ArrayDataType[], data?: ArrayBuffer | DataView | TypedArray, hints?: VOArrayHints);
        getTypedArray(type: ArrayDataType): Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array;
        /**
         * Copy all `vertex objects` from *source* to the internal *buffer* (destination).
         * Both *arrays* should have the same `bytesPerVO` value.
         *
         * @param from - Source *array*.
         * @param toOffset - `vertex object` destination offset
         */
        copy(from: VOArray, toOffset?: number): void;
        /**
         * Returns the array buffer converted to an `Uint32Array`.
         * As a side-effect the `uint32Array` property will be created (if it did not exist before).
         */
        toUint32Array(): Uint32Array;
        /**
         * Create a VOArray *subarray*.
         *
         * A *subarray* is a *view* to the same underlying buffer. No data will be copied.
         *
         * @param begin - Index of first `vertex object`
         * @param size - Number of `vertex objects` to copy
         */
        subarray(begin: number, size?: number): VOArray;
    }
}
declare module "textures/PowerOf2Image" {
    export type ImageSource = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    /**
     * Represents a `<img>` or `<canvas>` element which sizes (width and height) are
     * always power of 2.
     */
    export class PowerOf2Image {
        readonly loaded: Promise<PowerOf2Image>;
        imgEl: ImageSource;
        origWidth: number;
        origHeight: number;
        /**
         * If image source dimension is NOT power of 2 then create a new `<canvas>`
         * (with power of 2 dimension) and copy the original image content onto it.
         * Since fetching imge data from server is a *async* operation the `imgEl` property
         * can be `null` right after object construction and will be set later after
         * image is loaded (and possible converted).
         */
        constructor(from: string | ImageSource);
        /**
         * `true` if the image has loaded and possible converted
         */
        readonly isLoaded: boolean;
        /**
         * Image width or `0` if image loading is not finished
         */
        readonly width: number;
        /**
         * Image height or `0` if image loading is not finished
         */
        readonly height: number;
        setImgEl(imgEl: ImageSource): void;
    }
}
declare module "textures/Texture" {
    import { ImageSource, PowerOf2Image } from "textures/PowerOf2Image";
    export type TextureImage = PowerOf2Image | ImageSource;
    export type TextureSource = Texture | TextureImage;
    export class Texture {
        static load(url: string): Promise<Texture>;
        image: TextureImage;
        parent: Texture;
        x: number;
        y: number;
        private _width;
        private _height;
        private _features;
        constructor(source: TextureSource, width?: number, height?: number, x?: number, y?: number);
        getFeature(name: string): unknown;
        setFeature(name: string, value: unknown): void;
        readonly root: Texture;
        readonly imgEl: ImageSource;
        width: number;
        height: number;
        readonly minS: number;
        readonly minT: number;
        readonly maxS: number;
        readonly maxT: number;
    }
}
declare module "textures/TextureAtlas" {
    import { Texture } from "textures/Texture";
    interface Features {
        [feature: string]: unknown;
    }
    export interface TextureAtlasFrameDescription extends Features {
        frame: {
            x: number;
            y: number;
            w: number;
            h: number;
        };
        baselineOffset?: number;
    }
    export interface TextureAtlasMetaDescription extends Features {
        image: string;
        lineHeight?: number;
    }
    export interface TextureAtlasDescription {
        frames: {
            [frameName: string]: TextureAtlasFrameDescription;
        };
        meta: TextureAtlasMetaDescription;
    }
    export class TextureAtlas {
        /**
         * Load a texture atlas from json defintion
         */
        static load(path: string, basePath?: string): Promise<TextureAtlas>;
        baseTexture: Texture;
        private _frames;
        private _allFrames;
        private _allFrameNames;
        private _features;
        constructor(baseTexture: Texture, data: TextureAtlasDescription);
        addFrame(name: string, width: number, height: number, x: number, y: number, features?: Features): void;
        frame(name: string): Texture;
        randomFrame(): Texture;
        frameNames(match: string | RegExp): string[];
        randomFrameName(): string;
        getFeature(name: string): unknown;
        setFeature(name: string, value: unknown): void;
    }
}
