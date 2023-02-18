import Point from "../geometry/Point.js";
import Tetrahedron from "../geometry/Tetrahedron.js";
import { Vec4 } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";

export default class Gasket extends DrawObject {
    constructor() {
        super()

        const points: Vec4[] = []
        const colors: Vec4[] = [];
        function divideRecursiveTetrahedron(tetrahedron: Tetrahedron, level: number) {
            if (!level) {
                tetrahedron.triangles.forEach(triangle => {
                    points.push(...triangle.points[0].vertices)
                    points.push(...triangle.points[1].vertices)
                    points.push(...triangle.points[2].vertices)
                })
                tetrahedron.colorTriangles.forEach(triangle => {
                    colors.push(...triangle.points[0].vertices)
                    colors.push(...triangle.points[1].vertices)
                    colors.push(...triangle.points[2].vertices)
                })
            } else {
                level--;
                tetrahedron.divide().forEach(function (o) {
                    divideRecursiveTetrahedron(o, level);
                })
            }
        }
        const recursiveLevel = 5;
        divideRecursiveTetrahedron(new Tetrahedron(
            new Point(0, 0, 1)
            , new Point(0, 1, -1)
            , new Point(1, -1, -1)
            , new Point(-1, -1, -1)
        ), recursiveLevel);
        this.setVertices(points);
        this.setColors(colors);
        this.setIndices(new Array(points.length).fill(0).map((_, index) => index))

    }
}