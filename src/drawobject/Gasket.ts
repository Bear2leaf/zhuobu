import LineSegment from "../math/LineSegment.js";
import Point from "../math/Point.js";
import Tetrahedron from "../math/Tetrahedron.js";
import Triangle from "../math/Triangle.js";
import Matrix from "../math/Matrix.js";
import { Vec3, Vec4, flatten } from "../math/Vector.js";
import Node from "../component/Node.js";
import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";

export default class Gasket extends DrawObject {
    private frame = 0;
    init(){
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
        const recursiveLevel = 2;
        divideRecursiveTetrahedron(tetrahedron, recursiveLevel);

        
        this.createABO(ArrayBufferIndex.Position, flatten(points), 4)
        this.createABO(ArrayBufferIndex.Color, flatten(colors), 4)
        this.updateEBO(new Uint16Array(points.map((_, i) => i)))
    }
    update(): void {
        this.rotatePerFrame(this.getEntity().get(Node), this.frame++);
    }
    draw(mode: number): void {
        this.bind()
        super.draw(mode);
    }
    setInitPosition(node: Node) {
        node.getWorldMatrix().set(Matrix.translation(new Vec3(0, 2, -8)))
    }
    rotatePerFrame(node: Node, frame: number) {
        this.setInitPosition(node);
        node.getWorldMatrix().rotateY(Math.PI / 180 * frame);
    }
}

