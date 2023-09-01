import LineSegment from "../geometry/LineSegment.js";
import Point from "../geometry/Point.js";
import Tetrahedron from "../geometry/Tetrahedron.js";
import Triangle from "../geometry/Triangle.js";
import Matrix from "../geometry/Matrix.js";
import { Vec3, Vec4, flatten } from "../geometry/Vector.js";
import Node from "../component/Node.js";
import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../contextobject/RenderingContext.js";
import TRS from "../component/TRS.js";

export default class Gasket extends DrawObject {
    private frame = 0;
    init() {
        super.init();
        const pA = new Point(0, 0, 1);
        const pB = new Point(0, 1, -1);
        const pC = new Point(1, -1, -1);
        const pD = new Point(-1, -1, -1);
        const tetrahedron = new Tetrahedron(
            new Triangle(new LineSegment(pA, pC), new LineSegment(pC, pB))
            , new Triangle(new LineSegment(pA, pB), new LineSegment(pB, pD))
            , new Triangle(new LineSegment(pA, pD), new LineSegment(pD, pC))
        );
        const points: Vec4[] = [];
        const colors: Vec4[] = [];

        function divideRecursiveTetrahedron(tetrahedron: Tetrahedron, level: number) {
            if (!level) {
                tetrahedron.appendTo(points, colors)
            } else {
                level--;
                tetrahedron.divide().forEach(function (o) {
                    divideRecursiveTetrahedron(o, level);
                })
            }
        }
        const recursiveLevel = 5;
        divideRecursiveTetrahedron(tetrahedron, recursiveLevel);


        this.createABO(ArrayBufferIndex.Position, flatten(points), 4)
        this.createABO(ArrayBufferIndex.Color, flatten(colors), 4)
        this.updateEBO(new Uint16Array(points.map((_, i) => i)))
    }
    update(): void {
        this.rotatePerFrame(this.frame++);
    }
    draw(mode: number): void {
        this.bind()
        super.draw(mode);
    }
    rotatePerFrame(frame: number) {
        this.getEntity().get(TRS).getPosition().set(0, 2, -5, 1);
        const rotationMatrix = Matrix.rotationX(Math.PI / 180 * frame).multiply(Matrix.rotationY(Math.PI / 180 * frame)).multiply(Matrix.rotationZ(Math.PI / 180 * frame));
        Matrix.quatFromRotationMatrix(rotationMatrix, this.getEntity().get(TRS).getRotation());
    }
}

