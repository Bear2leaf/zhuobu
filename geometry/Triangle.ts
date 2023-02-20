import { Vec4 } from "../math/Vector.js";
import Mesh from "./Mesh.js";
import LineSegment from "./LineSegment.js";
import Point from "./Point.js";

export default class Triangle implements Mesh {
    readonly ab: LineSegment;
    readonly bc: LineSegment;
    readonly ca: LineSegment;
    readonly indices: readonly [number, number, number];
    readonly colors: readonly [Vec4, Vec4, Vec4];
    readonly points: readonly [Point, Point, Point];
    readonly vertices: readonly [Vec4, Vec4, Vec4];

    get a(): Point { return this.ab.points[0] };
    get b(): Point { return this.bc.points[0] };
    get c(): Point { return this.ca.points[0] };
    constructor(ab: LineSegment, bc: LineSegment) {
        this.ab = ab;
        this.bc = bc;
        this.ca = new LineSegment(bc.points[1], ab.points[0]);
        this.points = [this.a, this.b, this.c]
        this.indices = [
            0, 1, 2
        ];
        this.colors = [
            ...this.a.colors
            , ...this.b.colors
            , ...this.c.colors
        ];
        this.vertices = [...this.a.vertices, ...this.b.vertices, ...this.c.vertices]
    }
    divide(): [Triangle, Triangle, Triangle] {
        return [
            new Triangle(new LineSegment(this.a, this.ca.midPoint), new LineSegment(this.ca.midPoint, this.ab.midPoint))
            , new Triangle(new LineSegment(this.b, this.ab.midPoint), new LineSegment(this.ab.midPoint, this.bc.midPoint))
            , new Triangle(new LineSegment(this.c, this.bc.midPoint), new LineSegment(this.bc.midPoint, this.ca.midPoint))
        ];

    }
}