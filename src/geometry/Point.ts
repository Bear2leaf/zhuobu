import { Vec4 } from "./Vector.js";

export default class Point {
    private readonly x: number;
    private readonly y: number;
    private readonly z: number;
    private readonly w: number;
    private readonly vertices: [Vec4];
    private readonly colors: [Vec4];
    private readonly indices: [number];
    private readonly texcoords: [Vec4];
    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1, color: Vec4 = new Vec4(1, 1, 1, 1), index: number = 0, texcoord: Vec4 = new Vec4()) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.vertices = [new Vec4(this.x, this.y, this.z, this.w)];
        this.colors = [color];
        this.indices = [index];
        this.texcoords = [texcoord];
    }
    equels(a: Point): boolean {
        return this.x === a.x && this.y === a.y && this.z === a.z && this.w === a.w;
    }
    appendTo(vertices?: Vec4[], colors?: Vec4[], indices?: number[], texcoords?: Vec4[]): void {
        vertices?.push(...this.vertices);
        colors?.push(...this.colors);
        indices?.push(...this.indices);
        texcoords?.push(...this.texcoords);
    }
    static midPoint(a: Point, b: Point): Point {
        const vec = a.vertices[0].clone().lerp(b.vertices[0], 0.5);
        return new Point(vec.x, vec.y, vec.z, vec.w);
    }
}