import { Vec4, flatten } from "../math/Vector";
import ArrayBufferObject, { ArrayBufferIndex } from "./ArrayBufferObject";
import DrawObject from "./DrawObject";

export default class GLTFScene extends DrawObject {
    constructor() {
        const colors: Vec4[] = [];
        const indices: number[] = [];
        const vertices: Vec4[] = [];
        
        super(new Map<number, ArrayBufferObject>(), indices.length);
        this.aboMap.set(ArrayBufferIndex.Vertices, new ArrayBufferObject(ArrayBufferIndex.Vertices, flatten(vertices)))
        this.aboMap.set(ArrayBufferIndex.Colors, new ArrayBufferObject(ArrayBufferIndex.Colors, flatten(colors)))
        this.updateEBO(new Uint16Array(indices));
    }
}

