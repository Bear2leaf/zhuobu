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
    constructor(acb: Triangle, abd: Triangle, adc: Triangle) {
        this.acb = acb;
        this.abd = abd;
        this.adc = adc;
        this.bcd = new Triangle(new LineSegment(this.acb.points[2], this.acb.points[1]), new LineSegment(this.acb.points[1], this.abd.points[2]));
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
            Tetrahedron.fromPoints(triangleBatchD[0].points[1], triangleBatchA[0].points[1], triangleBatchA[0].points[0], triangleBatchA[0].points[2],) // RBG
            // lb
            // , Tetrahedron.fromPoints(triangleBatchA[2].points[2], triangleBatchC[0].points[1], triangleBatchA[2].points[0], triangleBatchA[2].points[1],) // RGY
            // , Tetrahedron.fromPoints(triangleBatchA[2].points[0], triangleBatchA[2].points[2], triangleBatchC[0].points[1], triangleBatchA[2].points[1],) // RYB
            , Tetrahedron.fromPoints(triangleBatchC[0].points[1], triangleBatchA[2].points[0], triangleBatchA[2].points[2], triangleBatchA[2].points[1],) // RBG
            // , Tetrahedron.fromPoints(triangleBatchC[0].points[1], triangleBatchA[2].points[2], triangleBatchA[2].points[1], triangleBatchA[2].points[0],) // GRB
            // , Tetrahedron.fromPoints(triangleBatchA[2].points[0], triangleBatchC[0].points[1], triangleBatchA[2].points[1], triangleBatchA[2].points[2],) // GYR
            // , Tetrahedron.fromPoints(triangleBatchA[2].points[2], triangleBatchA[2].points[0], triangleBatchA[2].points[1], triangleBatchC[0].points[1],) // GBY
            // , Tetrahedron.fromPoints(triangleBatchC[0].points[1], triangleBatchA[2].points[1], triangleBatchA[2].points[0], triangleBatchA[2].points[2],) // BGR
            // , Tetrahedron.fromPoints(triangleBatchA[2].points[2], triangleBatchA[2].points[1], triangleBatchC[0].points[1], triangleBatchA[2].points[0],) // BRY
            // , Tetrahedron.fromPoints(triangleBatchA[2].points[0], triangleBatchA[2].points[1], triangleBatchA[2].points[2], triangleBatchC[0].points[1],) // BYG
            // , Tetrahedron.fromPoints(triangleBatchA[2].points[1], triangleBatchC[0].points[1], triangleBatchA[2].points[2], triangleBatchA[2].points[0],) // YRG
            // , Tetrahedron.fromPoints(triangleBatchA[2].points[1], triangleBatchA[2].points[0], triangleBatchC[0].points[1], triangleBatchA[2].points[2],) // YBR
            // , Tetrahedron.fromPoints(triangleBatchA[2].points[1], triangleBatchA[2].points[2], triangleBatchA[2].points[0], triangleBatchC[0].points[1],) // YGB
            // rb
            // D1c === A0c
            , Tetrahedron.fromPoints(triangleBatchB[2].points[2], triangleBatchB[2].points[1], triangleBatchD[1].points[2], triangleBatchB[2].points[0],) // RBG
            // , Tetrahedron.fromPoints(triangleBatchB[2].points[1], ‰triangleBatchB[2].points[0], triangleBatchD[1].points[2], triangleBatchB[2].points[2],) // BYG
            // , Tetrahedron.fromPoints(triangleBatchD[1].points[2], triangleBatchB[2].points[1], triangleBatchB[2].points[0], triangleBatchB[2].points[2],) // GBY
            // , Tetrahedron.fromPoints(triangleBatchB[2].points[0], triangleBatchD[1].points[2], triangleBatchB[2].points[1], triangleBatchB[2].points[2],) // YGB
            // middle
            , Tetrahedron.fromPoints(triangleBatchC[0].points[0], triangleBatchC[0].points[1], triangleBatchC[0].points[2], triangleBatchD[0].points[2],) // RBG
            // , Tetrahedron.fromPoints(triangleBatchC[0].points[0], triangleBatchD[0].points[2], triangleBatchC[0].points[1], triangleBatchC[0].points[2],) // BGR
            // , Tetrahedron.fromPoints(triangleBatchC[0].points[1], triangleBatchC[0].points[0], triangleBatchD[0].points[2], triangleBatchC[0].points[2],) // GYR
            // , Tetrahedron.fromPoints(triangleBatchC[0].points[1], triangleBatchD[0].points[2], triangleBatchC[0].points[2], triangleBatchC[0].points[0],) // BYG
            // , Tetrahedron.fromPoints(triangleBatchD[0].points[2], triangleBatchC[0].points[2], triangleBatchC[0].points[1], triangleBatchC[0].points[0],) // YGB
            // , Tetrahedron.fromPoints(triangleBatchD[0].points[2], triangleBatchC[0].points[1], triangleBatchC[0].points[0], triangleBatchC[0].points[2],) // YBR
            // , Tetrahedron.fromPoints(triangleBatchD[2].points[2], triangleBatchB[0].points[1], triangleBatchB[0].points[0], triangleBatchB[0].points[2], ) // BRY
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