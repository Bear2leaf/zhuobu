import { Vec4 } from "./Vector.js";

export default interface Geometory {
    get vertices(): Vec4[];
}
export class Points implements Geometory {
    private readonly points: Point[];
    constructor() {
        this.points = [];
    }
    add(point: Point) {
        this.points.push(point);
    }
    get vertices() {
        return this.points.reduce<Vec4[]>(function (prev, cur) {
            prev.push(...cur.vertices);
            return prev;
        }, []);
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
    static fromVec(vec: Vec4) {
        return new Point(vec.x, vec.y, vec.z, vec.w);
    }
    get vertices() { return [new Vec4(this.x, this.y, this.z, this.w)] }
}
export class Triangle implements Geometory {
    private readonly a: Point;
    private readonly b: Point;
    private readonly c: Point;
    get vertices() { return [...this.a.vertices, ...this.b.vertices, ...this.c.vertices] }
    constructor(a: Point, b: Point, c: Point) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
}