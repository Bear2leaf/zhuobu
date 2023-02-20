import { Vec4 } from "../math/Vector.js";
import Mesh from "./Mesh.js";
import LineSegment from "./LineSegment.js";
import Point from "./Point.js";
import Triangle from "./Triangle.js";

    /*
    *
    *                  b (0, 1, -1)
    *                 /|\
    *                / | \
    *               /  |  \
    *              /   |   \
    *             /    |    \
    *            /     |     \
    * (0, 0, 1) a------|------d (-1, -1, -1)
    *            \     |     /
    *             \    |    /
    *              \   |   /
    *               \  |  /
    *                \ | /
    *                 \|/
    *                  c (1, -1, -1)
    *           
    **/
export default class Tetrahedron implements Mesh {
    readonly acb: Triangle;
    readonly abd: Triangle;
    readonly adc: Triangle;
    readonly bcd: Triangle;
    readonly indices: readonly [ number, number, number, number, number, number, number, number, number, number, number, number];
    readonly colors: readonly[Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4];
    readonly vertices: readonly [Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4];
    get a(): Point { return this.acb.a }
    get b(): Point { return this.acb.c }
    get c(): Point { return this.acb.b }
    get d(): Point { return this.abd.c }
    get points(): [Point, Point, Point, Point] { return [this.a, this.b, this.c, this.d] }
    get triangles(): [Triangle, Triangle, Triangle, Triangle] { return [this.acb, this.abd, this.adc, this.bcd] }
    constructor(acb: Triangle, abd: Triangle, adc: Triangle) {
        this.acb = acb;
        this.abd = abd;
        this.adc = adc;
        this.bcd = new Triangle(new LineSegment(this.b, this.c), new LineSegment(this.c, this.d));
        this.vertices = [
            ...this.acb.vertices
            , ...this.abd.vertices
            , ...this.adc.vertices
            , ...this.bcd.vertices
        ]
        this.indices = [
            0, 1, 2
            , 3, 4, 5
            , 6, 7, 8
            , 9, 10, 11
        ]
        this.colors = [
            new Vec4(1, 0, 0, 1), new Vec4(1, 0, 0, 1), new Vec4(1, 0, 0, 1)
            , new Vec4(0, 1, 0, 1), new Vec4(0, 1, 0, 1), new Vec4(0, 1, 0, 1)
            , new Vec4(0, 0, 1, 1), new Vec4(0, 0, 1, 1), new Vec4(0, 0, 1, 1)
            , new Vec4(1, 1, 0, 1), new Vec4(1, 1, 0, 1), new Vec4(1, 1, 0, 1)
        ]
    }

    static fromPoints(a: Point, b: Point, c: Point, d: Point): Tetrahedron {
        return new Tetrahedron(
            new Triangle(new LineSegment(a, c), new LineSegment(c, b))
            , new Triangle(new LineSegment(a, b), new LineSegment(b, d))
            , new Triangle(new LineSegment(a, d), new LineSegment(d, c))
        )
    }

}