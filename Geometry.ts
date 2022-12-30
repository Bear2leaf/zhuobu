import { Vec4 } from "./Vector.js";

export default interface Geometory {
    get vertices(): Vec4[];
}
export class PointCollection implements Geometory {
    private readonly points: Point[];
    get vertices() {
        return this.points.reduce<Vec4[]>(function (prev, cur) {
            prev.push(...cur.vertices);
            return prev;
        }, []);
    }
    constructor() {
        this.points = [];
    }
    get(index: number) {
        return this.points[index];
    }
    add(point: Point) {
        this.points.push(point);
    }
}
export class Point implements Geometory {
    private readonly x: number;
    private readonly y: number;
    private readonly z: number;
    private readonly w: number;
    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    get vertices(): [Vec4] {
        return [new Vec4(this.x, this.y, this.z, this.w)]
    }
    lineTo(point: Point): LineSegment {
        return new LineSegment(this, point);
    }
}
export class LineSegment implements Geometory {
    private readonly a: Point;
    private readonly b: Point;
    get points(): [Point, Point] { return [this.a, this.b] }
    get vertices(): [Vec4, Vec4] { return [this.a.vertices[0], this.b.vertices[0]] }
    get midPoint(): Point {
        const vec = this.a.vertices[0].clone().lerp(this.b.vertices[0], 0.5);
        return new Point(vec.x, vec.y, vec.z, vec.w);
    }

    constructor(a: Point, b: Point) {
        this.a = a;
        this.b = b;
    }
}
export class Triangle implements Geometory {
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
    get ab(): LineSegment { return new LineSegment(this.a, this.b) }
    get ca(): LineSegment { return new LineSegment(this.c, this.a) }
    get bc(): LineSegment { return new LineSegment(this.b, this.c) }
    constructor(a: Point, b: Point, c: Point) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    static makeColorTriangle(color: Vec4) {
        const point = new Point(color.x, color.y, color.z, color.w);
        return new Triangle(point, point, point);
    }
}
export class Tetrahedron implements Geometory {
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
}