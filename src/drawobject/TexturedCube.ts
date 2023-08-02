import Cube from "../math/Cube.js";
import Matrix from "../math/Matrix.js";
import { Vec2, Vec3, Vec4, flatten } from "../math/Vector.js";
import Node from "../component/Node.js";
import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";

export default class TexturedCube extends DrawObject {
    private frame = 0;
    init() {
        const cube = new Cube();
        const triangles = cube.getTriangles();
        const points = cube.getPoints();
        const indices: number[] = [];
        const colors: Vec4[] = [new Vec4(1, 1, 1, 1)];
        const vertices: Vec4[] = [];
        const textureCoords: Vec4[] = [];

        points.forEach((point) => {
            point.appendTo(vertices, colors)
        });
        triangles.forEach((triangle) => {
            triangle.appendTo(undefined, undefined, indices);
        });
        for (let i = 0; i < 2; i++) {
            textureCoords.push(new Vec2(0, 1));
            textureCoords.push(new Vec2(1, 1));
            textureCoords.push(new Vec2(0, 0));
            textureCoords.push(new Vec2(1, 0));
        }


        this.createABO(ArrayBufferIndex.Position, flatten(vertices), 4);
        this.createABO(ArrayBufferIndex.Color, flatten(colors), 4);
        this.createABO(ArrayBufferIndex.TextureCoord, flatten(textureCoords), 2);
        this.updateEBO(new Uint16Array(indices))
    }
    update(): void {
        this.rotatePerFrame(this.getEntity().get(Node), this.frame++);
    }
    draw(mode: number): void {
        this.bind()
        super.draw(mode);
    }
    setInitPosition(node: Node) {
        node.getWorldMatrix().set(Matrix.translation(new Vec3(0, -1, -8)))
    }
    rotatePerFrame(node: Node, frame: number) {
        this.setInitPosition(node);
        node.getWorldMatrix().rotateY(Math.PI / 180 * frame).rotateX(Math.PI / 180 * frame).rotateZ(Math.PI / 180 * frame);
    }

}

