export interface Arrays {
    [key: string]: number[] | ArrayBuffer
}

export interface BufferInfo {
    numElements: number;
    elementType?: number;
    indices: WebGLBuffer;
    attribs: { [key: string]: AttribInfo };
}

export interface AttribInfo {
    numComponents?: number;
    size?: number;
    type?: number;
    normalize?: boolean;
    offset?: number;
    stride?: number;
    buffer?: WebGLBuffer;
    drawType?: number;
}

/* DataType */
var BYTE = 0x1400;
var UNSIGNED_BYTE = 0x1401;
var SHORT = 0x1402;
var UNSIGNED_SHORT = 0x1403;
var INT = 0x1404;
var UNSIGNED_INT = 0x1405;
var FLOAT = 0x1406;
const UNSIGNED_SHORT_4_4_4_4 = 0x8033;
const UNSIGNED_SHORT_5_5_5_1 = 0x8034;
const UNSIGNED_SHORT_5_6_5 = 0x8363;
const HALF_FLOAT = 0x140B;
const UNSIGNED_INT_2_10_10_10_REV = 0x8368;
const UNSIGNED_INT_10F_11F_11F_REV = 0x8C3B;
const UNSIGNED_INT_5_9_9_9_REV = 0x8C3E;
const FLOAT_32_UNSIGNED_INT_24_8_REV = 0x8DAD;
const UNSIGNED_INT_24_8 = 0x84FA;

const glTypeToTypedArray = {};
{
    const tt = glTypeToTypedArray;
    tt[BYTE] = Int8Array;
    tt[UNSIGNED_BYTE] = Uint8Array;
    tt[SHORT] = Int16Array;
    tt[UNSIGNED_SHORT] = Uint16Array;
    tt[INT] = Int32Array;
    tt[UNSIGNED_INT] = Uint32Array;
    tt[FLOAT] = Float32Array;
    tt[UNSIGNED_SHORT_4_4_4_4] = Uint16Array;
    tt[UNSIGNED_SHORT_5_5_5_1] = Uint16Array;
    tt[UNSIGNED_SHORT_5_6_5] = Uint16Array;
    tt[HALF_FLOAT] = Uint16Array;
    tt[UNSIGNED_INT_2_10_10_10_REV] = Uint32Array;
    tt[UNSIGNED_INT_10F_11F_11F_REV] = Uint32Array;
    tt[UNSIGNED_INT_5_9_9_9_REV] = Uint32Array;
    tt[FLOAT_32_UNSIGNED_INT_24_8_REV] = Uint32Array;
    tt[UNSIGNED_INT_24_8] = Uint32Array;
}

function getNormalizationForTypedArrayType(typedArrayType) {
    if (typedArrayType === Int8Array) { return true; }  // eslint-disable-line
    if (typedArrayType === Uint8Array) { return true; }  // eslint-disable-line
    return false;
}

function getNormalizationForTypedArray(typedArray) {
    if (typedArray instanceof Int8Array) { return true; }  // eslint-disable-line
    if (typedArray instanceof Uint8Array) { return true; }  // eslint-disable-line
    return false;
}

const defaults = {
    attribPrefix: "",
};

const isArrayBuffer = (<any>window).SharedArrayBuffer
    ? function isArrayBufferOrSharedArrayBuffer(a) {
        return a && a.buffer && (a.buffer instanceof ArrayBuffer || a.buffer instanceof (<any>window).SharedArrayBuffer);
    }
    : function isArrayBuffer(a) {
        return a && a.buffer && a.buffer instanceof ArrayBuffer;
    };

function isIndices(name) {
    return name === "indices";
}

function getArray(array) {
    return array.length ? array : array.data;
}

const texcoordRE = /coord|texture/i;
const colorRE = /color|colour/i;

function getBytesPerValueForGLType(gl, type) {
    if (type === gl.BYTE) return 1;  // eslint-disable-line
    if (type === gl.UNSIGNED_BYTE) return 1;  // eslint-disable-line
    if (type === gl.SHORT) return 2;  // eslint-disable-line
    if (type === gl.UNSIGNED_SHORT) return 2;  // eslint-disable-line
    if (type === gl.INT) return 4;  // eslint-disable-line
    if (type === gl.UNSIGNED_INT) return 4;  // eslint-disable-line
    if (type === gl.FLOAT) return 4;  // eslint-disable-line
    return 0;
}

function guessNumComponentsFromName(name, length) {
    var numComponents;
    if (texcoordRE.test(name)) {
        numComponents = 2;
    } else if (colorRE.test(name)) {
        numComponents = 4;
    } else {
        numComponents = 3;  // position, normals, indices ...
    }

    if (length % numComponents > 0) {
        throw "Can not guess numComponents for attribute '" + name + "'. Tried " +
        numComponents + " but " + length +
        " values is not evenly divisible by " + numComponents +
        ". You should specify it.";
    }

    return numComponents;
}

function getNumComponents(array, arrayName) {
    return array.numComponents || array.size || guessNumComponentsFromName(arrayName, getArray(array).length);
}

var positionKeys = ['position', 'positions', 'a_position'];
function getNumElementsFromNonIndexedArrays(arrays) {
    var key;
    for (var ii = 0; ii < positionKeys.length; ++ii) {
        key = positionKeys[ii];
        if (key in arrays) {
            break;
        }
    }
    if (ii === positionKeys.length) {
        key = Object.keys(arrays)[0];
    }
    var array = arrays[key];
    var length = getArray(array).length;
    var numComponents = getNumComponents(array, key);
    var numElements = length / numComponents;
    if (length % numComponents > 0) {
        throw "numComponents " + numComponents + " not correct for length " + length;
    }
    return numElements;
}

function getNumElementsFromAttributes(gl, attribs) {
    var key;
    for (var ii = 0; ii < positionKeys.length; ++ii) {
        key = positionKeys[ii];
        if (key in attribs) {
            break;
        }
        key = defaults.attribPrefix + key;
        if (key in attribs) {
            break;
        }
    }
    if (ii === positionKeys.length) {
        key = Object.keys(attribs)[0];
    }
    var attrib = attribs[key];
    gl.bindBuffer(gl.ARRAY_BUFFER, attrib.buffer);
    var numBytes = gl.getBufferParameter(gl.ARRAY_BUFFER, gl.BUFFER_SIZE);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var bytesPerValue = getBytesPerValueForGLType(gl, attrib.type);
    var totalElements = numBytes / bytesPerValue;
    var numComponents = attrib.numComponents || attrib.size;
    // TODO: check stride
    var numElements = totalElements / numComponents;
    if (numElements % 1 !== 0) {
        throw "numComponents " + numComponents + " not correct for length " + length;
    }
    return numElements;
}

function makeTypedArray(array, name) {
    if (isArrayBuffer(array)) {
        return array;
    }

    if (isArrayBuffer(array.data)) {
        return array.data;
    }

    if (Array.isArray(array)) {
        array = {
            data: array,
        };
    }

    var Type = array.type;
    if (!Type) {
        if (isIndices(name)) {
            Type = Uint16Array;
        } else {
            Type = Float32Array;
        }
    }
    return new Type(array.data);
}

function setBufferFromTypedArray(gl, type, buffer, array, drawType?) {
    gl.bindBuffer(type, buffer);
    gl.bufferData(type, array, drawType || gl.STATIC_DRAW);
}

export function createBufferFromTypedArray(gl, typedArray, type, drawType?) {
    if (typedArray instanceof WebGLBuffer) {
        return typedArray;
    }
    type = type || gl.ARRAY_BUFFER;
    var buffer = gl.createBuffer();
    setBufferFromTypedArray(gl, type, buffer, typedArray, drawType);
    return buffer;
}

export function createAttribsFromArrays(gl: WebGLRenderingContext, arrays: Arrays) {
    var attribs = {};
    Object.keys(arrays).forEach((arrayName) => {
        if (!isIndices(arrayName)) {
            const array = <any>arrays[arrayName];
            const attribName = array.attrib || array.name || array.attribName || (defaults.attribPrefix + arrayName);
            let buffer;
            let type;
            let normalization;
            let numComponents;
            let numValues;

            if (typeof array === "number" || typeof array.data === "number") {
                numValues = array.data || array;
                var arrayType = array.type || Float32Array;
                var numBytes = numValues * arrayType.BYTES_PER_ELEMENT;
                type = getGLTypeForTypedArrayType(arrayType);
                normalization = array.normalize !== undefined ? array.normalize : getNormalizationForTypedArrayType(arrayType);
                numComponents = array.numComponents || array.size || guessNumComponentsFromName(arrayName, numValues);
                buffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                gl.bufferData(gl.ARRAY_BUFFER, numBytes, array.drawType || gl.STATIC_DRAW);
            } else {
                var typedArray = makeTypedArray(array, arrayName);
                buffer = createBufferFromTypedArray(gl, typedArray, undefined, array.drawType);
                type = getGLTypeForTypedArray(typedArray);
                normalization = array.normalize !== undefined ? array.normalize : getNormalizationForTypedArray(typedArray);
                numComponents = getNumComponents(array, arrayName);
                numValues = typedArray.length;
            }
            attribs[attribName] = {
                buffer: buffer,
                numComponents: numComponents,
                type: type,
                normalize: normalization,
                stride: array.stride || 0,
                offset: array.offset || 0,
                divisor: array.divisor === undefined ? undefined : array.divisor,
                drawType: array.drawType,
            };
        }
    });
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return attribs;
}

export function createBufferInfoFromArrays(gl: WebGLRenderingContext, arrays: Arrays) {
    const bufferInfo: any = {
        attribs: createAttribsFromArrays(gl, arrays),
    };
    let indices = <any>arrays.indices;
    if (indices) {
        indices = makeTypedArray(indices, "indices");
        bufferInfo.indices = createBufferFromTypedArray(gl, indices, gl.ELEMENT_ARRAY_BUFFER);
        bufferInfo.numElements = indices.length;
        bufferInfo.elementType = getGLTypeForTypedArray(indices);
    } else {
        bufferInfo.numElements = getNumElementsFromAttributes(gl, bufferInfo.attribs);
    }

    return <BufferInfo>bufferInfo;
}

export function getGLTypeForTypedArray(typedArray) {
    if (typedArray instanceof Int8Array) { return BYTE; }           // eslint-disable-line
    if (typedArray instanceof Uint8Array) { return UNSIGNED_BYTE; }  // eslint-disable-line
    if (typedArray instanceof Uint8ClampedArray) { return UNSIGNED_BYTE; }  // eslint-disable-line
    if (typedArray instanceof Int16Array) { return SHORT; }          // eslint-disable-line
    if (typedArray instanceof Uint16Array) { return UNSIGNED_SHORT; } // eslint-disable-line
    if (typedArray instanceof Int32Array) { return INT; }            // eslint-disable-line
    if (typedArray instanceof Uint32Array) { return UNSIGNED_INT; }   // eslint-disable-line
    if (typedArray instanceof Float32Array) { return FLOAT; }          // eslint-disable-line
    throw "unsupported typed array type";
}

export function getGLTypeForTypedArrayType(typedArrayType) {
    if (typedArrayType === Int8Array) { return BYTE; }           // eslint-disable-line
    if (typedArrayType === Uint8Array) { return UNSIGNED_BYTE; }  // eslint-disable-line
    if (typedArrayType === Uint8ClampedArray) { return UNSIGNED_BYTE; }  // eslint-disable-line
    if (typedArrayType === Int16Array) { return SHORT; }          // eslint-disable-line
    if (typedArrayType === Uint16Array) { return UNSIGNED_SHORT; } // eslint-disable-line
    if (typedArrayType === Int32Array) { return INT; }            // eslint-disable-line
    if (typedArrayType === Uint32Array) { return UNSIGNED_INT; }   // eslint-disable-line
    if (typedArrayType === Float32Array) { return FLOAT; }          // eslint-disable-line
    throw "unsupported typed array type";
}