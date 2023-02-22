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

        function divideRecursiveTetrahedron(tetrahedron: Tetrahedron, level: number) {
            if (!level) {
                points.push(...tetrahedron.vertices)
                colors.push(...tetrahedron.colors)
            } else {
                level--;
                tetrahedron.divide().forEach(function (o) {
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

