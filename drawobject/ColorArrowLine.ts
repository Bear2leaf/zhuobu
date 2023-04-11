import LineSegment from "../geometry/LineSegment.js";
import Point from "../geometry/Point.js";
import { Vec4, flatten } from "../math/Vector.js";
import ArrayBufferObject, { ArrayBufferIndex } from "./ArrayBufferObject.js";
import DrawObject from "./DrawObject.js";

export default class ColorArrowLine extends DrawObject {
    constructor(from: Point, to: Point, color: Vec4) {
        const line = new LineSegment(from, to);
        line.colors.fill(color)

        
        super(new Map<number, ArrayBufferObject>(), line.indices.length );
        this.aboMap.set(ArrayBufferIndex.Vertices, new ArrayBufferObject(ArrayBufferIndex.Vertices, flatten(line.vertices), new Uint16Array(line.indices)))
        this.aboMap.set(ArrayBufferIndex.Colors, new ArrayBufferObject(ArrayBufferIndex.Colors, flatten(line.colors), new Uint16Array(line.indices)))
        
    }
}

