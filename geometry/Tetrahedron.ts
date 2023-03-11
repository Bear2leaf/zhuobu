import { Vec4 } from "../math/Vector.js";
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
export default class Tetrahedron {
    readonly acb: Triangle;
    readonly abd: Triangle;
    readonly adc: Triangle;
    readonly bcd: Triangle;
    readonly indices: [number, number, number, number, number, number, number, number, number, number, number, number];
    readonly colors: [Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4];
    readonly vertices: [Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4];
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
            ...this.acb.indices
            , ...this.abd.indices
            , ...this.adc.indices
            , ...this.bcd.indices
        ]
        this.colors = [
            new Vec4(1, 0, 0, 1), new Vec4(1, 0, 0, 1), new Vec4(1, 0, 0, 1)
            , new Vec4(0, 1, 0, 1), new Vec4(0, 1, 0, 1), new Vec4(0, 1, 0, 1)
            , new Vec4(0, 0, 1, 1), new Vec4(0, 0, 1, 1), new Vec4(0, 0, 1, 1)
            , new Vec4(1, 1, 0, 1), new Vec4(1, 1, 0, 1), new Vec4(1, 1, 0, 1)
        ]
    }


    divide() {
        const triangleBatchD = this.acb.divide();
        const triangleBatchC = this.abd.divide();
        const triangleBatchB = this.adc.divide();
        const triangleBatchA = this.bcd.divide();
        return [
            // colors are in lrb order

            // top
            Tetrahedron.fromPoints(triangleBatchD[0].b, triangleBatchA[0].b, triangleBatchA[0].a, triangleBatchA[0].c,) // RBG
            // lb
            // , Tetrahedron.fromPoints(triangleBatchA[2].c, triangleBatchC[0].b, triangleBatchA[2].a, triangleBatchA[2].b,) // RGY
            // , Tetrahedron.fromPoints(triangleBatchA[2].a, triangleBatchA[2].c, triangleBatchC[0].b, triangleBatchA[2].b,) // RYB
            , Tetrahedron.fromPoints(triangleBatchC[0].b, triangleBatchA[2].a, triangleBatchA[2].c, triangleBatchA[2].b,) // RBG
            // , Tetrahedron.fromPoints(triangleBatchC[0].b, triangleBatchA[2].c, triangleBatchA[2].b, triangleBatchA[2].a,) // GRB
            // , Tetrahedron.fromPoints(triangleBatchA[2].a, triangleBatchC[0].b, triangleBatchA[2].b, triangleBatchA[2].c,) // GYR
            // , Tetrahedron.fromPoints(triangleBatchA[2].c, triangleBatchA[2].a, triangleBatchA[2].b, triangleBatchC[0].b,) // GBY
            // , Tetrahedron.fromPoints(triangleBatchC[0].b, triangleBatchA[2].b, triangleBatchA[2].a, triangleBatchA[2].c,) // BGR
            // , Tetrahedron.fromPoints(triangleBatchA[2].c, triangleBatchA[2].b, triangleBatchC[0].b, triangleBatchA[2].a,) // BRY
            // , Tetrahedron.fromPoints(triangleBatchA[2].a, triangleBatchA[2].b, triangleBatchA[2].c, triangleBatchC[0].b,) // BYG
            // , Tetrahedron.fromPoints(triangleBatchA[2].b, triangleBatchC[0].b, triangleBatchA[2].c, triangleBatchA[2].a,) // YRG
            // , Tetrahedron.fromPoints(triangleBatchA[2].b, triangleBatchA[2].a, triangleBatchC[0].b, triangleBatchA[2].c,) // YBR
            // , Tetrahedron.fromPoints(triangleBatchA[2].b, triangleBatchA[2].c, triangleBatchA[2].a, triangleBatchC[0].b,) // YGB
            // rb
            // D1c === A0c
            , Tetrahedron.fromPoints(triangleBatchB[2].c, triangleBatchB[2].b, triangleBatchD[1].c, triangleBatchB[2].a,) // RBG
            // , Tetrahedron.fromPoints(triangleBatchB[2].b, ‰triangleBatchB[2].a, triangleBatchD[1].c, triangleBatchB[2].c,) // BYG
            // , Tetrahedron.fromPoints(triangleBatchD[1].c, triangleBatchB[2].b, triangleBatchB[2].a, triangleBatchB[2].c,) // GBY
            // , Tetrahedron.fromPoints(triangleBatchB[2].a, triangleBatchD[1].c, triangleBatchB[2].b, triangleBatchB[2].c,) // YGB
            // middle
            , Tetrahedron.fromPoints(triangleBatchC[0].a, triangleBatchC[0].b, triangleBatchC[0].c, triangleBatchD[0].c,) // RBG
            // , Tetrahedron.fromPoints(triangleBatchC[0].a, triangleBatchD[0].c, triangleBatchC[0].b, triangleBatchC[0].c,) // BGR
            // , Tetrahedron.fromPoints(triangleBatchC[0].b, triangleBatchC[0].a, triangleBatchD[0].c, triangleBatchC[0].c,) // GYR
            // , Tetrahedron.fromPoints(triangleBatchC[0].b, triangleBatchD[0].c, triangleBatchC[0].c, triangleBatchC[0].a,) // BYG
            // , Tetrahedron.fromPoints(triangleBatchD[0].c, triangleBatchC[0].c, triangleBatchC[0].b, triangleBatchC[0].a,) // YGB
            // , Tetrahedron.fromPoints(triangleBatchD[0].c, triangleBatchC[0].b, triangleBatchC[0].a, triangleBatchC[0].c,) // YBR
            // , Tetrahedron.fromPoints(triangleBatchD[2].c, triangleBatchB[0].b, triangleBatchB[0].a, triangleBatchB[0].c, ) // BRY
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