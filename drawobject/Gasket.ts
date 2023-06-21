import LineSegment from "../geometry/LineSegment.js";
import Point from "../geometry/Point.js";
import Tetrahedron from "../geometry/Tetrahedron.js";
import Triangle from "../geometry/Triangle.js";
import Matrix from "../math/Matrix.js";
import { Vec3, Vec4, flatten } from "../math/Vector.js";
import Node from "../structure/Node.js";
import GLTexture from "../texture/GLTexture.js";
import GLArrayBufferObject from "../contextobject/GLArrayBufferObject.js";
import DrawObject from "./DrawObject.js";
import RenderingContext, { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";

export default class Gasket extends DrawObject {
    private frame = 0;
    constructor(gl: RenderingContext, texture: GLTexture) {
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

        
        super(gl, texture, new Map<number, GLArrayBufferObject>(), points.length);
        this.createABO(ArrayBufferIndex.Position, flatten(points), 4)
        this.createABO(ArrayBufferIndex.Color, flatten(colors), 4)
        this.updateEBO(new Uint16Array(points.map((_, i) => i)))
    }
    update(node: Node): void {
        this.rotatePerFrame(node, this.frame++);
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

