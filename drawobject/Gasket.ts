import LineSegment from "../geometry/LineSegment.js";
import Mesh from "../geometry/Mesh.js";
import Point from "../geometry/Point.js";
import Tetrahedron from "../geometry/Tetrahedron.js";
import Triangle from "../geometry/Triangle.js";
import { Vec4 } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";

export default class Gasket extends DrawObject {
    constructor() {
        const pA = new Point(0, 0, 1);
        const pB = new Point(0, 1, -1);
        const pC = new Point(1, -1, -1);
        const pD = new Point(-1, -1, -1);
        const tetrahedron = new Tetrahedron(
            new Triangle(new LineSegment(pA, pC), new LineSegment(pC, pB))
            , new Triangle(new LineSegment(pA, pB), new LineSegment(pB, pD))
            , new Triangle(new LineSegment(pA, pD), new LineSegment(pD, pC))
        );
        super();
        const points: Vec4[] = [];
        const colors: Vec4[] = [];

        function divide(tetrahedron: Tetrahedron) {
            const triangleBatchD = tetrahedron.acb.divide();
            const triangleBatchC = tetrahedron.abd.divide();
            const triangleBatchB = tetrahedron.adc.divide();
            const triangleBatchA = tetrahedron.bcd.divide();
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

        function divideRecursiveTetrahedron(tetrahedron: Tetrahedron, level: number) {
            if (!level) {
                points.push(...tetrahedron.vertices)
                colors.push(...tetrahedron.colors)
            } else {
                level--;
                divide(tetrahedron).forEach(function (o) {
                    divideRecursiveTetrahedron(o, level);
                })
            }
        }
        const recursiveLevel = 3;
        divideRecursiveTetrahedron(tetrahedron, recursiveLevel);
        this.mesh = new Mesh(colors, points.map((_, i) => i), points);
        console.log(this.mesh)
    }
}

