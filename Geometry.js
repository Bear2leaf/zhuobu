import { Vec4 } from "./Vector.js";
export class PointCollection {
    constructor() {
        this.points = [];
    }
    get vertices() {
        return this.points.reduce(function (prev, cur) {
            prev.push(...cur.vertices);
            return prev;
        }, []);
    }
    get(index) {
        return this.points[index];
    }
    add(point) {
        this.points.push(point);
    }
}
export class Point {
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    get vertices() {
        return [new Vec4(this.x, this.y, this.z, this.w)];
    }
    lineTo(point) {
        return new LineSegment(this, point);
    }
}
export class LineSegment {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    get points() { return [this.a, this.b]; }
    get vertices() { return [this.a.vertices[0], this.b.vertices[0]]; }
    get midPoint() {
        const vec = this.a.vertices[0].clone().lerp(this.b.vertices[0], 0.5);
        return new Point(vec.x, vec.y, vec.z, vec.w);
    }
}
export class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    divide() {
        return [
            new Triangle(this.c, this.bc.midPoint, this.ca.midPoint),
            new Triangle(this.ab.midPoint, this.a, this.ca.midPoint),
            new Triangle(this.ab.midPoint, this.bc.midPoint, this.b)
        ];
    }
    get points() { return [this.a, this.b, this.c]; }
    get vertices() { return [this.a.vertices[0], this.b.vertices[0], this.c.vertices[0]]; }
    get ab() { return new LineSegment(this.a, this.b); }
    get ca() { return new LineSegment(this.c, this.a); }
    get bc() { return new LineSegment(this.b, this.c); }
}
export class Tetrahedron {
    constructor(a, b, c, d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }
    divide() {
        return [
            new Tetrahedron(this.a, this.ab.midPoint, this.ca.midPoint, this.ad.midPoint),
            new Tetrahedron(this.b, this.ab.midPoint, this.bc.midPoint, this.bd.midPoint),
            new Tetrahedron(this.c, this.ca.midPoint, this.bc.midPoint, this.dc.midPoint),
            new Tetrahedron(this.d, this.ad.midPoint, this.bd.midPoint, this.dc.midPoint)
        ];
    }
    get triangles() { return [new Triangle(this.a, this.b, this.c), new Triangle(this.d, this.b, this.c), new Triangle(this.a, this.b, this.d), new Triangle(this.a, this.d, this.c),]; }
    get points() { return [this.a, this.b, this.c, this.d]; }
    get vertices() { return [this.a.vertices[0], this.b.vertices[0], this.c.vertices[0], this.d.vertices[0]]; }
    get ab() { return new LineSegment(this.a, this.b); }
    get ca() { return new LineSegment(this.c, this.a); }
    get bc() { return new LineSegment(this.b, this.c); }
    get cd() { return new LineSegment(this.c, this.d); }
    get ad() { return new LineSegment(this.a, this.d); }
    get bd() { return new LineSegment(this.b, this.d); }
    get dc() { return new LineSegment(this.d, this.c); }
}
//# sourceMappingURL=Geometry.js.map