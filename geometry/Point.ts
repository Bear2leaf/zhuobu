import { Vec4 } from "../math/Vector.js";
import LineSegment from "./LineSegment.js";

export default class Point {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly w: number;
    readonly vertices: [Vec4];
    readonly colors: [Vec4];
    readonly indices: [number];
    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.vertices = [new Vec4(this.x, this.y, this.z, this.w)];
        this.colors = [new Vec4(1, 1, 1, 1)];
        this.indices = [0];
    }
    equels(a: Point): boolean {
        return this.x === a.x && this.y === a.y && this.z === a.z && this.w === a.w;
    }
    lineTo(point: Point): LineSegment {
        return new LineSegment(this, point);
    }
}