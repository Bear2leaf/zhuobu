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
    private readonly acb: Triangle;
    private readonly abd: Triangle;
    private readonly adc: Triangle;
    private readonly bcd: Triangle;
    private readonly indices: number[];
    private readonly colors: Vec4[];
    private readonly vertices: Vec4[];
    constructor(acb: Triangle, abd: Triangle, adc: Triangle) {
        this.acb = acb;
        this.abd = abd;
        this.adc = adc;
        this.bcd = new Triangle(new LineSegment(this.acb.getThirdPoint(), this.acb.getSecondPoint()), new LineSegment(this.acb.getSecondPoint(), this.abd.getThirdPoint()));
        this.vertices = []
        this.indices = []
        this.acb.appendTo(this.vertices, undefined, this.indices);
        this.abd.appendTo(this.vertices, undefined, this.indices);
        this.adc.appendTo(this.vertices, undefined, this.indices);
        this.bcd.appendTo(this.vertices, undefined, this.indices);

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
            Tetrahedron.fromPoints(triangleBatchD[0].getSecondPoint(), triangleBatchA[0].getSecondPoint(), triangleBatchA[0].getFirstPoint(), triangleBatchA[0].getThirdPoint(),) // RBG
            // lb
            // , Tetrahedron.fromPoints(triangleBatchA[2].getThirdPoint(), triangleBatchC[0].getSecondPoint(), triangleBatchA[2].getFirstPoint(), triangleBatchA[2].getSecondPoint(),) // RGY
            // , Tetrahedron.fromPoints(triangleBatchA[2].getFirstPoint(), triangleBatchA[2].getThirdPoint(), triangleBatchC[0].getSecondPoint(), triangleBatchA[2].getSecondPoint(),) // RYB
            , Tetrahedron.fromPoints(triangleBatchC[0].getSecondPoint(), triangleBatchA[2].getFirstPoint(), triangleBatchA[2].getThirdPoint(), triangleBatchA[2].getSecondPoint(),) // RBG
            // , Tetrahedron.fromPoints(triangleBatchC[0].getSecondPoint(), triangleBatchA[2].getThirdPoint(), triangleBatchA[2].getSecondPoint(), triangleBatchA[2].getFirstPoint(),) // GRB
            // , Tetrahedron.fromPoints(triangleBatchA[2].getFirstPoint(), triangleBatchC[0].getSecondPoint(), triangleBatchA[2].getSecondPoint(), triangleBatchA[2].getThirdPoint(),) // GYR
            // , Tetrahedron.fromPoints(triangleBatchA[2].getThirdPoint(), triangleBatchA[2].getFirstPoint(), triangleBatchA[2].getSecondPoint(), triangleBatchC[0].getSecondPoint(),) // GBY
            // , Tetrahedron.fromPoints(triangleBatchC[0].getSecondPoint(), triangleBatchA[2].getSecondPoint(), triangleBatchA[2].getFirstPoint(), triangleBatchA[2].getThirdPoint(),) // BGR
            // , Tetrahedron.fromPoints(triangleBatchA[2].getThirdPoint(), triangleBatchA[2].getSecondPoint(), triangleBatchC[0].getSecondPoint(), triangleBatchA[2].getFirstPoint(),) // BRY
            // , Tetrahedron.fromPoints(triangleBatchA[2].getFirstPoint(), triangleBatchA[2].getSecondPoint(), triangleBatchA[2].getThirdPoint(), triangleBatchC[0].getSecondPoint(),) // BYG
            // , Tetrahedron.fromPoints(triangleBatchA[2].getSecondPoint(), triangleBatchC[0].getSecondPoint(), triangleBatchA[2].getThirdPoint(), triangleBatchA[2].getFirstPoint(),) // YRG
            // , Tetrahedron.fromPoints(triangleBatchA[2].getSecondPoint(), triangleBatchA[2].getFirstPoint(), triangleBatchC[0].getSecondPoint(), triangleBatchA[2].getThirdPoint(),) // YBR
            // , Tetrahedron.fromPoints(triangleBatchA[2].getSecondPoint(), triangleBatchA[2].getThirdPoint(), triangleBatchA[2].getFirstPoint(), triangleBatchC[0].getSecondPoint(),) // YGB
            // rb
            // D1c === A0c
            , Tetrahedron.fromPoints(triangleBatchB[2].getThirdPoint(), triangleBatchB[2].getSecondPoint(), triangleBatchD[1].getThirdPoint(), triangleBatchB[2].getFirstPoint(),) // RBG
            // , Tetrahedron.fromPoints(triangleBatchB[2].getSecondPoint(), ‰triangleBatchB[2].getFirstPoint(), triangleBatchD[1].getThirdPoint(), triangleBatchB[2].getThirdPoint(),) // BYG
            // , Tetrahedron.fromPoints(triangleBatchD[1].getThirdPoint(), triangleBatchB[2].getSecondPoint(), triangleBatchB[2].getFirstPoint(), triangleBatchB[2].getThirdPoint(),) // GBY
            // , Tetrahedron.fromPoints(triangleBatchB[2].getFirstPoint(), triangleBatchD[1].getThirdPoint(), triangleBatchB[2].getSecondPoint(), triangleBatchB[2].getThirdPoint(),) // YGB
            // middle
            , Tetrahedron.fromPoints(triangleBatchC[0].getFirstPoint(), triangleBatchC[0].getSecondPoint(), triangleBatchC[0].getThirdPoint(), triangleBatchD[0].getThirdPoint(),) // RBG
            // , Tetrahedron.fromPoints(triangleBatchC[0].getFirstPoint(), triangleBatchD[0].getThirdPoint(), triangleBatchC[0].getSecondPoint(), triangleBatchC[0].getThirdPoint(),) // BGR
            // , Tetrahedron.fromPoints(triangleBatchC[0].getSecondPoint(), triangleBatchC[0].getFirstPoint(), triangleBatchD[0].getThirdPoint(), triangleBatchC[0].getThirdPoint(),) // GYR
            // , Tetrahedron.fromPoints(triangleBatchC[0].getSecondPoint(), triangleBatchD[0].getThirdPoint(), triangleBatchC[0].getThirdPoint(), triangleBatchC[0].getFirstPoint(),) // BYG
            // , Tetrahedron.fromPoints(triangleBatchD[0].getThirdPoint(), triangleBatchC[0].getThirdPoint(), triangleBatchC[0].getSecondPoint(), triangleBatchC[0].getFirstPoint(),) // YGB
            // , Tetrahedron.fromPoints(triangleBatchD[0].getThirdPoint(), triangleBatchC[0].getSecondPoint(), triangleBatchC[0].getFirstPoint(), triangleBatchC[0].getThirdPoint(),) // YBR
            // , Tetrahedron.fromPoints(triangleBatchD[2].getThirdPoint(), triangleBatchB[0].getSecondPoint(), triangleBatchB[0].getFirstPoint(), triangleBatchB[0].getThirdPoint(), ) // BRY
        ]
    }
    appendTo(vertices?: Vec4[], colors?: Vec4[], indices?: number[]) {
        const { vertices: v, colors: c, indices: i } = this;
        vertices?.push(...v);
        colors?.push(...c);
        indices?.push(...i);
    }
    static fromPoints(a: Point, b: Point, c: Point, d: Point): Tetrahedron {
        return new Tetrahedron(
            new Triangle(new LineSegment(a, c), new LineSegment(c, b))
            , new Triangle(new LineSegment(a, b), new LineSegment(b, d))
            , new Triangle(new LineSegment(a, d), new LineSegment(d, c))
        )
    }

}