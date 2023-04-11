import Cone from "../geometry/Cone.js";
import { Vec4, flatten } from "../math/Vector.js";
import ArrayBufferObject, { ArrayBufferIndex } from "./ArrayBufferObject.js";
import DrawObject from "./DrawObject.js";

export default class BlackWireCone extends DrawObject {
    constructor() {
        const cone = new Cone();
        const lines = cone.getLines();
        const points = cone.getPoints();
        const colors: Vec4[] = [];
        const indices: number[] = [];
        const vertices: Vec4[] = [];
        lines.forEach((line) => {
            indices.push(...line.indices);
        });
        points.forEach((point) => {
            vertices.push(...point.vertices);
            point.colors[0].set(0, 0, 0, 1);
            colors.push(...point.colors);
        });
        
        
        
        super(new Map<number, ArrayBufferObject>(), indices.length);
        this.aboMap.set(ArrayBufferIndex.Vertices, new ArrayBufferObject(ArrayBufferIndex.Vertices, flatten(vertices), new Uint16Array(indices)))
        this.aboMap.set(ArrayBufferIndex.Colors, new ArrayBufferObject(ArrayBufferIndex.Colors, flatten(colors), new Uint16Array(indices)))
        
    }
}

