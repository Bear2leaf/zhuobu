
import LineSegment from "../geometry/LineSegment.js";
import Point from "../geometry/Point.js";
import { Vec4, flatten } from "../math/Vector.js";
import Node from "../structure/Node.js";
import ArrayBufferObject, { ArrayBufferIndex } from "./ArrayBufferObject.js";
import DrawObject from "./DrawObject.js";

export default class XYZAxis extends DrawObject {

    constructor() {
        const lineX = new LineSegment(new Point(0, 0, 0, 1), new Point(2, 0, 0, 1));
        lineX.colors.fill(new Vec4(1, 0, 0, 1))
        lineX.indices[0] = 0;
        lineX.indices[1] = 1;
        const lineY = new LineSegment(new Point(0, 0, 0, 1), new Point(0, 2, 0, 1));
        lineY.colors.fill(new Vec4(0, 1, 0, 1))
        lineY.indices[0] = 2;
        lineY.indices[1] = 3;
        const lineZ = new LineSegment(new Point(0, 0, 0, 1), new Point(0, 0, 2, 1));
        lineZ.colors.fill(new Vec4(0, 0, 1, 1))
        lineZ.indices[0] = 4;
        lineZ.indices[1] = 5;
        const aboMap = new Map<number, ArrayBufferObject>();
        super(new Node(), aboMap, lineX.indices.length + lineY.indices.length + lineZ.indices.length);
        aboMap.set(ArrayBufferIndex.Vertices, new ArrayBufferObject(ArrayBufferIndex.Vertices, flatten(lineX.vertices.concat(lineY.vertices).concat(lineZ.vertices))));
        aboMap.set(ArrayBufferIndex.Colors, new ArrayBufferObject(ArrayBufferIndex.Colors, flatten(lineX.colors.concat(lineY.colors).concat(lineZ.colors))));
        this.updateEBO(new Uint16Array(lineX.indices.concat(lineY.indices).concat(lineZ.indices)));
        console.log(this)
    }

}