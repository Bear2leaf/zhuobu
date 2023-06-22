import { Vec4 } from "../math/Vector.js";
import LineSegment from "./LineSegment.js";
import Point from "./Point.js";

export default class Triangle {
    private readonly ab: LineSegment;
    private readonly bc: LineSegment;
    private readonly ca: LineSegment;
    private readonly points: readonly [Point, Point, Point];
    private readonly indices: number[];
    private readonly colors: Vec4[];
    private readonly vertices: Vec4[];

    constructor(ab: LineSegment, bc: LineSegment) {
        this.ab = ab;
        this.bc = bc;
        this.ca = new LineSegment(bc.getEndPoint(), ab.getStartPoint());
        this.points = [this.ab.getStartPoint(), this.bc.getStartPoint(), this.ca.getStartPoint()]
        this.vertices = [];
        this.colors = [];
        this.indices = [];
        this.points.forEach(p => p.appendTo(this.vertices, this.colors, this.indices));
    }
    getFirstPoint(): Point {
        return this.ab.getStartPoint();
    }
    getSecondPoint(): Point {
        return this.bc.getStartPoint();
    }
    getThirdPoint(): Point {
        return this.ca.getStartPoint();
    }
    divide(): [Triangle, Triangle, Triangle] {
        return [
            new Triangle(new LineSegment(this.points[0], this.ca.getMidPoint()), new LineSegment(this.ca.getMidPoint(), this.ab.getMidPoint()))
            , new Triangle(new LineSegment(this.points[1], this.ab.getMidPoint()), new LineSegment(this.ab.getMidPoint(), this.bc.getMidPoint()))
            , new Triangle(new LineSegment(this.points[2], this.bc.getMidPoint()), new LineSegment(this.bc.getMidPoint(), this.ca.getMidPoint()))
        ];

    }
    appendTo(vertices?: Vec4[], colors?: Vec4[], indices?: number[]) {
        this.points.forEach(p => p.appendTo(vertices, colors, indices));
    }
    static fromPoints(a: Point, b: Point, c: Point): Triangle {
        return new Triangle(new LineSegment(a, b), new LineSegment(b, c));
    }

}