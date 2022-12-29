import { Vec4 } from "./Vector.js";
export class Points {
    constructor() {
        this.points = [];
    }
    add(point) {
        this.points.push(point);
    }
    get vertices() {
        return this.points.reduce(function (prev, cur) {
            prev.push(...cur.vertices);
            return prev;
        }, []);
    }
}
export class Point {
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    static fromVec(vec) {
        return new Point(vec.x, vec.y, vec.z, vec.w);
    }
    get vertices() { return [new Vec4(this.x, this.y, this.z, this.w)]; }
}
export class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    get vertices() { return [...this.a.vertices, ...this.b.vertices, ...this.c.vertices]; }
}
//# sourceMappingURL=Geometry.js.map