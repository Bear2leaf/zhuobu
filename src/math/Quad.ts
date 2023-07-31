import { Vec2, Vec4 } from "../math/Vector.js";
import LineSegment from "./LineSegment.js";
import Point from "./Point.js";

export default class Quad {

    private readonly a: Point;
    private readonly b: Point;
    private readonly c: Point;
    private readonly d: Point;

    private readonly indices: number[];
    private readonly colors: Vec4[];
    private readonly vertices: Vec4[];
    private readonly texcoords: Vec4[];

    constructor(left: number, top: number, width: number, height: number, color: Vec4 = new Vec4(1, 1, 1, 1), initIndex: number = 0) {
        this.a = new Point(left, top, undefined, undefined, color, 0);
        this.b = new Point(left, top + height, undefined, undefined, color, 1);
        this.c = new Point(left + width, top + height, undefined, undefined, color, 2);
        this.d = new Point(left + width, top, undefined, undefined, color, 3);
        this.indices = [
            initIndex, initIndex + 2, initIndex + 1,
            initIndex + 2, initIndex, initIndex + 3
        ];
        this.colors = [];
        this.vertices = [];
        this.texcoords = [];
        this.a.appendTo(this.vertices, this.colors, undefined, this.texcoords);
        this.b.appendTo(this.vertices, this.colors, undefined, this.texcoords);
        this.c.appendTo(this.vertices, this.colors, undefined, this.texcoords);
        this.d.appendTo(this.vertices, this.colors, undefined, this.texcoords);

    }
    getLines(): LineSegment[] {

        return [
            new LineSegment(this.a, this.b),
            new LineSegment(this.b, this.c),
            new LineSegment(this.c, this.d),
            new LineSegment(this.d, this.a)
        ]
    }
    initTexCoords() {
        this.texcoords[0].x = 0;
        this.texcoords[0].y = 1;
        this.texcoords[1].x = 0;
        this.texcoords[1].y = 0;
        this.texcoords[2].x = 1;
        this.texcoords[2].y = 0;
        this.texcoords[3].x = 1;
        this.texcoords[3].y = 1;

    }
    setHeight(height: number) {
        this.vertices[1].y = this.vertices[0].y + height;
        this.vertices[2].y = this.vertices[1].y;
    }
    copyHeight(other: Quad) {
        this.vertices[1].y = other.vertices[1].y;
        this.vertices[2].y = other.vertices[1].y;
    }
    appendTo(vertices?: Vec4[], colors?: Vec4[], indices?: number[], texcoords?: Vec4[]) {
        this.vertices.forEach(v => vertices?.push(v));
        this.colors.forEach(c => colors?.push(c));
        this.indices.forEach(i => indices?.push(i));
        this.texcoords.forEach(i => texcoords?.push(i));
    }
}