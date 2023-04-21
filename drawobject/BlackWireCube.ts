import Cube from "../geometry/Cube.js";
import { Vec4, flatten } from "../math/Vector.js";
import Node from "../structure/Node.js";
import ArrayBufferObject, { ArrayBufferIndex } from "./ArrayBufferObject.js";
import DrawObject from "./DrawObject.js";

export default class BlackWireCube extends DrawObject {
    constructor() {
        const cube = new Cube();
        const lines = cube.getLines();
        const points = cube.getPoints();
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

        
        super(new Node(), new Map<number, ArrayBufferObject>(), indices.length);
        this.aboMap.set(ArrayBufferIndex.Vertices, new ArrayBufferObject(ArrayBufferIndex.Vertices, flatten(vertices)))
        this.aboMap.set(ArrayBufferIndex.Colors, new ArrayBufferObject(ArrayBufferIndex.Colors, flatten(colors)))
        this.updateEBO(new Uint16Array(indices));
    }
}

