import { Vec4, flatten } from "../math/Vector.js";
import ArrayBufferObject, { ArrayBufferIndex } from "./ArrayBufferObject.js";
import DrawObject from "./DrawObject.js";

export default class WaveFrontObj extends DrawObject {
    constructor() {
        const colors: Vec4[] = [];
        const indices: number[] = [];
        const vertices: Vec4[] = [];
        
        super(new Map<number, ArrayBufferObject>(), indices.length);
        this.aboMap.set(ArrayBufferIndex.Vertices, new ArrayBufferObject(ArrayBufferIndex.Vertices, flatten(vertices), new Uint16Array(indices)))
        this.aboMap.set(ArrayBufferIndex.Colors, new ArrayBufferObject(ArrayBufferIndex.Colors, flatten(colors), new Uint16Array(indices)))
    }
}

