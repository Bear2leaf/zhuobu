import { Vec4 } from "../math/Vector.js";
import Point from "./Point.js";

export default class Quad {

    private readonly a: Point;
    private readonly b: Point;
    private readonly c: Point;
    private readonly d: Point;

    readonly indices: [number, number, number, number, number, number];
    readonly colors: [Vec4, Vec4, Vec4, Vec4];
    readonly vertices: [Vec4, Vec4, Vec4, Vec4];

    constructor(left: number, top: number, width: number, height: number) {
        this.a = new Point(left, top);
        this.b = new Point(left, top + height);
        this.c = new Point(left + width, top + height);
        this.d = new Point(left + width, top);
        this.indices = [
            0, 1, 2,
            2, 3, 0
        ];
        this.colors = [
            ...this.a.colors,
            ...this.b.colors,
            ...this.c.colors,
            ...this.d.colors
        ];
        this.vertices = [
            ...this.a.vertices,
            ...this.b.vertices,
            ...this.c.vertices,
            ...this.d.vertices
        ];
        
    }
}