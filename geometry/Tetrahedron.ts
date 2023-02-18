import { Vec4 } from "../math/Vector.js";
import Mesh from "./Mesh.js";
import LineSegment from "./LineSegment.js";
import Point from "./Point.js";
import Triangle from "./Triangle.js";

export default class Tetrahedron implements Mesh {
    divide(): [Tetrahedron, Tetrahedron, Tetrahedron, Tetrahedron] {
        return [
            new Tetrahedron(this.d, this.dc.midPoint, this.bd.midPoint, this.ad.midPoint)
            , new Tetrahedron(this.dc.midPoint, this.c, this.bc.midPoint, this.ca.midPoint)
            , new Tetrahedron(this.bd.midPoint, this.bc.midPoint, this.b, this.ab.midPoint)
            , new Tetrahedron(this.ad.midPoint, this.ca.midPoint, this.ab.midPoint, this.a)
        ];

    }
    private readonly a: Point;
    private readonly b: Point;
    private readonly c: Point;
    private readonly d: Point;
    get triangles(): [Triangle, Triangle, Triangle, Triangle] { return [new Triangle(this.a, this.b, this.c), new Triangle(this.d, this.b, this.c), new Triangle(this.a, this.b, this.d), new Triangle(this.a, this.d, this.c)] }
    get colorTriangles(): [Triangle, Triangle, Triangle, Triangle] { return [Triangle.makeColorTriangle(new Vec4(1, 1, 1, 1)), Triangle.makeColorTriangle(new Vec4(0.75, 0.75, 0.75, 1)), Triangle.makeColorTriangle(new Vec4(0.5, 0.5, 0.5, 1)), Triangle.makeColorTriangle(new Vec4(0.25, 0.25, 0.25, 1))] }
    get points(): [Point, Point, Point, Point] { return [this.a, this.b, this.c, this.d] }
    get vertices(): [Vec4, Vec4, Vec4, Vec4] { return [this.a.vertices[0], this.b.vertices[0], this.c.vertices[0], this.d.vertices[0]] }
    get lineIndices(): number[] { return [0, 1, 2, 3, 1, 2, 0, 1, 3, 0, 3, 2] }
    get ab(): LineSegment { return new LineSegment(this.a, this.b) }
    get ca(): LineSegment { return new LineSegment(this.c, this.a) }
    get bc(): LineSegment { return new LineSegment(this.b, this.c) }
    get cd(): LineSegment { return new LineSegment(this.c, this.d) }
    get ad(): LineSegment { return new LineSegment(this.a, this.d) }
    get bd(): LineSegment { return new LineSegment(this.b, this.d) }
    get dc(): LineSegment { return new LineSegment(this.d, this.c) }
    constructor(a: Point, b: Point, c: Point, d: Point) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }
    get colors(): Vec4[] {
        throw new Error("Method not implemented.");
    }
    get triangleIndices(): number[] {
        throw new Error("Method not implemented.");
    }
}