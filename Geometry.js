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
//# sourceMappingURL=Geometry.js.map