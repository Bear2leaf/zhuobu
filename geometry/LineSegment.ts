import { Vec4 } from "../math/Vector.js";
import Point from "./Point.js";

export default class LineSegment {
    readonly a: Point;
    readonly b: Point;
    readonly indices: [number, number];
    readonly midPoint: Point;
    readonly colors: [Vec4, Vec4];
    readonly points: [Point, Point];
    readonly vertices: [Vec4, Vec4];

    constructor(a: Point, b: Point) {
        this.a = a;
        this.b = b;
        this.indices = [
            ...a.indices,
            ...b.indices
        ];
        const vec = this.a.vertices[0].clone().lerp(this.b.vertices[0], 0.5);
        this.midPoint = new Point(vec.x, vec.y, vec.z, vec.w);
        this.colors = [
            ...this.a.colors
            , ...this.b.colors
        ];
        this.points = [this.a, this.b] 
        this.vertices = [...this.a.vertices, ...this.b.vertices] 
    }
}