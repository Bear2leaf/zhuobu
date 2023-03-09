import LineSegment from "../geometry/LineSegment.js";
import Point from "../geometry/Point.js";
import { Vec4 } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";

export default class ColorArrowLine extends DrawObject {
    constructor(from: Point, to: Point, color: Vec4) {
        const line = new LineSegment(from, to);
        line.colors.fill(color)
        super(line.colors, line.indices, line.vertices);
    }
}

