import LineSegment from "../geometry/LineSegment.js";
import Point from "../geometry/Point.js";
import Tetrahedron from "../geometry/Tetrahedron.js";
import Triangle from "../geometry/Triangle.js";
import Matrix from "../math/Matrix.js";
import { Vec3, Vec4, flatten } from "../math/Vector.js";
import Node from "../structure/Node.js";
import Texture from "../texture/Texture.js";
import ArrayBufferObject, { ArrayBufferIndex } from "./ArrayBufferObject.js";
import DrawObject from "./DrawObject.js";

export default class Gasket extends DrawObject {
    constructor(gl: WebGL2RenderingContext, texture: Texture) {
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

        
        super(gl, texture, new Map<number, ArrayBufferObject>(), points.length);
        this.createABO(ArrayBufferIndex.Position, flatten(points), 4)
        this.createABO(ArrayBufferIndex.Color, flatten(colors), 4)
        this.updateEBO(new Uint16Array(points.map((_, i) => i)))
    }
    update(): void {
    }
    draw(mode: number): void {
        this.bind()
        super.draw(mode);
    }
    setInitPosition() {
        // this.getNode().getWorldMatrix().set(Matrix.translation(new Vec3(0, 2, -8)))
    }
    rotatePerFrame(frame: number) {
        this.setInitPosition();
        // this.getNode().getWorldMatrix().rotateY(Math.PI / 180 * frame);
    }
}

