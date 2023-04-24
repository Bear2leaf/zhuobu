import LineSegment from "../geometry/LineSegment.js";
import Point from "../geometry/Point.js";
import { Vec4, flatten } from "../math/Vector.js";
import Node from "../structure/Node.js";
import ArrayBufferObject, { ArrayBufferIndex } from "./ArrayBufferObject.js";
import DrawObject from "./DrawObject.js";

export default class ColorArrowLine extends DrawObject {
    constructor(from: Point, to: Point) {
        const line = new LineSegment(from, to);
        const colors: Vec4[] = [];
        const indices: number[] = [];
        const vertices: Vec4[] = [];
        line.appendTo(vertices, colors, indices);
        super(new Node(), new Map<number, ArrayBufferObject>(), 2);
        this.createABO(ArrayBufferIndex.Vertices, flatten(vertices))
        this.createABO(ArrayBufferIndex.Colors, flatten(colors))
        
        this.updateEBO(new Uint16Array(indices));
    }
}

