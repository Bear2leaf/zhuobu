import Cube from "../geometry/Cube.js";
import { Vec4, flatten } from "../math/Vector.js";
import Node from "../structure/Node.js";
import ArrayBufferObject, { ArrayBufferIndex } from "./ArrayBufferObject.js";
import DrawObject from "./DrawObject.js";

export default class BlackWireCube extends DrawObject {
    constructor() {
        const cube = new Cube(undefined, undefined, new Vec4(0, 0, 0, 1));
        const lines = cube.getLines();
        const points = cube.getPoints();
        const colors: Vec4[] = [];
        const indices: number[] = [];
        const vertices: Vec4[] = [];
        lines.forEach((line) => line.appendTo(undefined, undefined, indices));
        points.forEach((point) => {
            point.appendTo(vertices, colors);
        });

        
        super(new Node(), new Map<number, ArrayBufferObject>(), indices.length);
        this.createABO(ArrayBufferIndex.Vertices, flatten(vertices))
        this.createABO(ArrayBufferIndex.Colors, flatten(colors))
        this.updateEBO(new Uint16Array(indices));
    }
}

