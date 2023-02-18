import { Vec4 } from "../math/Vector.js";
import Mesh from "./Mesh.js";
import Point from "./Point.js";

export default class LineSegment implements Mesh {
    private readonly a: Point;
    private readonly b: Point;
    get points(): [Point, Point] { return [this.a, this.b] }
    get vertices(): [Vec4, Vec4] { return [this.a.vertices[0], this.b.vertices[0]] }
    get lineIndices(): [number, number] { return [0, 1] }
    get midPoint(): Point {
        const vec = this.a.vertices[0].clone().lerp(this.b.vertices[0], 0.5);
        return new Point(vec.x, vec.y, vec.z, vec.w);
    }

    constructor(a: Point, b: Point) {
        this.a = a;
        this.b = b;
    }
    get colors(): Vec4[] {
        throw new Error("Method not implemented.");
    }
    get triangleIndices(): number[] {
        throw new Error("Method not implemented.");
    }
}