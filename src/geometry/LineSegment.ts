import { Vec4 } from "./Vector.js";
import Point from "./Point.js";

export default class LineSegment {
    private readonly a: Point;
    private readonly b: Point;
    private readonly indices: number[];
    private readonly midPoint: Point;
    private readonly colors: Vec4[];
    private readonly points: [Point, Point];
    private readonly vertices: Vec4[];

    constructor(a: Point, b: Point) {
        this.a = a;
        this.b = b;
        this.indices = [];
        this.colors = [];
        this.vertices = [];
        this.midPoint = Point.midPoint(a, b);
        this.points = [this.a, this.b] 
        this.points.forEach(p => p.appendTo(this.vertices, this.colors, this.indices));
    }
    getMidPoint(): Point {
        return this.midPoint;
    }
    getStartPoint(): Point {
        return this.a;
    }
    getEndPoint(): Point {
        return this.b;
    }
    appendTo(vertices?: Vec4[], colors?: Vec4[], indices?: number[]) {
        this.points.forEach(p => p.appendTo(vertices, colors, indices));
    }
}