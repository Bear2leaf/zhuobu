import { Vec4 } from "../math/Vector.js";
import Mesh from "./Mesh.js";
import LineSegment from "./LineSegment.js";

export default class Point implements Mesh {
    private readonly x: number;
    private readonly y: number;
    private readonly z: number;
    private readonly w: number;
    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    get colors(): Vec4[] {
        return [new Vec4(1, 1, 1, 1)];
    }
    get triangleIndices(): number[] {
        throw new Error("Method not implemented.");
    }
    get vertices(): [Vec4] {
        return [new Vec4(this.x, this.y, this.z, this.w)]
    }
    get lineIndices(): [number] {
        return [0];
    }
    lineTo(point: Point): LineSegment {
        return new LineSegment(this, point);
    }
}