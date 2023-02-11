import { PointCollection, Tetrahedron, Point } from "../Geometry.js";
import Matrix from "../Matrix.js";
import { Vec3 } from "../Vector.js";
import DrawObject from "./DrawObject.js";

export default class Gasket extends DrawObject {
    constructor() {
        super();

        const points = new PointCollection()
        const colors = new PointCollection();
        function divideRecursiveTetrahedron(tetrahedron: Tetrahedron, level: number) {
            if (!level) {
                tetrahedron.triangles.forEach(triangle => {
                    points.add(triangle.points[0])
                    points.add(triangle.points[1])
                    points.add(triangle.points[2])
                })
                tetrahedron.colorTriangles.forEach(triangle => {
                    colors.add(triangle.points[0])
                    colors.add(triangle.points[1])
                    colors.add(triangle.points[2])
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
        this.setVertices(points.vertices);
        this.setColors(colors.vertices);
        this.setIndices(new Array(points.vertices.length).fill(0).map((_, index) => index))

    }
    update(): void {

    }
}