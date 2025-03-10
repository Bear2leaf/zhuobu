"use strict";

function tinyNDArrayOfInteger(gridShape: number[]) {
    var dimensions = gridShape.length,
        totalLength = 1,
        stride = new Array(dimensions),
        dimension;

    for (dimension = dimensions; dimension > 0; dimension--) {
        stride[dimension - 1] = totalLength;
        totalLength = totalLength * gridShape[dimension - 1];
    }

    return {
        stride: stride,
        data: new Uint32Array(totalLength)
    };
}

function tinyNDArrayOfArray(gridShape: number[]) {
    const dimensions = gridShape.length,
        stride = new Array<number>(dimensions),
        data: number[][] = [];
    let dimension: number, index: number, totalLength = 1;

    for (dimension = dimensions; dimension > 0; dimension--) {
        stride[dimension - 1] = totalLength;
        totalLength = totalLength * gridShape[dimension - 1];
    }

    for (index = 0; index < totalLength; index++) {
        data.push([]);
    }

    return {
        stride: stride,
        data: data
    };
}

export const integer = tinyNDArrayOfInteger;
export const array = tinyNDArrayOfArray;