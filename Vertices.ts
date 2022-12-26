import { Vec4 } from "./Vector.js";

export type Vertices = Vec4[];

export function flatten(vec4Array: Vec4[]): Float32Array {
    return vec4Array.reduce(function (prev, current, index) {
        prev[index * 4] = current.x;
        prev[index * 4 + 1] = current.y;
        prev[index * 4 + 2] = current.z;
        prev[index * 4 + 3] = current.w;
        return prev;
    }, new Float32Array(vec4Array.length * 4));
}