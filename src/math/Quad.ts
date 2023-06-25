import { Vec4 } from "../math/Vector.js";
import Point from "./Point.js";

export default class Quad {

    private readonly a: Point;
    private readonly b: Point;
    private readonly c: Point;
    private readonly d: Point;

    private readonly indices: number[];
    private readonly colors: Vec4[];
    private readonly vertices: Vec4[];

    constructor(left: number, top: number, width: number, height: number, color: Vec4 = new Vec4(1, 1, 1, 1), initIndex: number = 0) {
        this.a = new Point(left, top, undefined, undefined, color);
        this.b = new Point(left, top + height, undefined, undefined, color);
        this.c = new Point(left + width, top + height, undefined, undefined, color);
        this.d = new Point(left + width, top, undefined, undefined, color);
        this.indices = [
            initIndex, initIndex + 1, initIndex + 2,
            initIndex + 2, initIndex + 3, initIndex
        ];
        this.colors = [];
        this.vertices = [];
        this.a.appendTo(this.vertices, this.colors);
        this.b.appendTo(this.vertices, this.colors);
        this.c.appendTo(this.vertices, this.colors);
        this.d.appendTo(this.vertices, this.colors);
        
    }
    setZWToTexCoord() {
        this.vertices[1].z = 0;
        this.vertices[1].w = 1;

        this.vertices[0].z = 0;
        this.vertices[0].w = 0;

        this.vertices[3].z = 1;
        this.vertices[3].w = 0;

        this.vertices[2].z = 1;
        this.vertices[2].w = 1;
        
    }
    setHeight(height: number) {
        this.vertices[1].y = this.vertices[0].y + height;
        this.vertices[2].y = this.vertices[1].y;
    }
    copyHeight(other: Quad) {
        this.vertices[1].y = other.vertices[1].y;
        this.vertices[2].y = other.vertices[1].y;
    }
    appendTo(vertices?: Vec4[], colors?: Vec4[], indices?: number[]) {
        this.vertices.forEach(v => vertices?.push(v));
        this.colors.forEach(c => colors?.push(c));
        this.indices.forEach(i => indices?.push(i));
    }
}