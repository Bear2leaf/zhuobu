import { Vec4 } from "../math/Vector.js";
import LineSegment from "./LineSegment.js";
import Point from "./Point.js";

export default class Triangle {
    readonly ab: LineSegment;
    readonly bc: LineSegment;
    readonly ca: LineSegment;
    readonly indices: [number, number, number];
    readonly colors: [Vec4, Vec4, Vec4];
    readonly points: readonly [Point, Point, Point];
    readonly vertices: [Vec4, Vec4, Vec4];

    constructor(ab: LineSegment, bc: LineSegment) {
        this.ab = ab;
        this.bc = bc;
        this.ca = new LineSegment(bc.points[1], ab.points[0]);
        this.points = [this.ab.points[0], this.bc.points[0], this.ca.points[0]]
        this.indices = [
            ...this.points[0].indices,
            ...this.points[1].indices,
            ...this.points[2].indices
        ];
        this.colors = [
            ...this.points[0].colors
            , ...this.points[1].colors
            , ...this.points[2].colors
        ];
        this.vertices = [...this.points[0].vertices, ...this.points[1].vertices, ...this.points[2].vertices]
    }
    divide(): [Triangle, Triangle, Triangle] {
        return [
            new Triangle(new LineSegment(this.points[0], this.ca.midPoint), new LineSegment(this.ca.midPoint, this.ab.midPoint))
            , new Triangle(new LineSegment(this.points[1], this.ab.midPoint), new LineSegment(this.ab.midPoint, this.bc.midPoint))
            , new Triangle(new LineSegment(this.points[2], this.bc.midPoint), new LineSegment(this.bc.midPoint, this.ca.midPoint))
        ];

    }
    static fromPoints(a: Point, b: Point, c: Point): Triangle {
        return new Triangle(new LineSegment(a, b), new LineSegment(b, c));
    }

}