import LineSegment from "./LineSegment.js";
import Point from "./Point.js";
import Triangle from "./Triangle.js";

export default interface Geometry {
    getTriangles(): Triangle[];
    getLines(): LineSegment[];
    getPoints(): Point[];
}