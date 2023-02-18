import { Vec4 } from "../math/Vector.js";
import Mesh from "./Mesh.js";
import LineSegment from "./LineSegment.js";
import Point from "./Point.js";

export default class Triangle implements Mesh {
    divide(): [Triangle, Triangle, Triangle] {
        return [
            new Triangle(this.c, this.bc.midPoint, this.ca.midPoint)
            , new Triangle(this.ab.midPoint, this.a, this.ca.midPoint)
            , new Triangle(this.ab.midPoint, this.bc.midPoint, this.b)
        ];

    }
    private readonly a: Point;
    private readonly b: Point;
    private readonly c: Point;
    get points(): [Point, Point, Point] { return [this.a, this.b, this.c] }
    get vertices(): [Vec4, Vec4, Vec4] { return [this.a.vertices[0], this.b.vertices[0], this.c.vertices[0]] }
    get lineIndices(): number[] { return [0, 1, 2] }
    get ab(): LineSegment { return new LineSegment(this.a, this.b) }
    get ca(): LineSegment { return new LineSegment(this.c, this.a) }
    get bc(): LineSegment { return new LineSegment(this.b, this.c) }
    constructor(a: Point, b: Point, c: Point) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    get colors(): Vec4[] {
        return [
            new Vec4(1, 0, 0, 1)
            , new Vec4(0, 1, 0, 1)
            , new Vec4(0, 0, 1, 1)
        ]
    }
    get triangleIndices(): number[] { return [0, 1, 2] }
    static makeColorTriangle(color: Vec4) {
        const point = new Point(color.x, color.y, color.z, color.w);
        return new Triangle(point, point, point);
    }
}