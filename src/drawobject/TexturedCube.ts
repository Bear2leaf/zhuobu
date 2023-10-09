import Cube from "../geometry/Cube.js";
import Matrix from "../geometry/Matrix.js";
import { Vec2, Vec3, Vec4, flatten } from "../geometry/Vector.js";
import Node from "../transform/Node.js";
import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../contextobject/RenderingContext.js";
import TRS from "../transform/TRS.js";

export default class TexturedCube extends DrawObject {
    private frame = 0;
    init() {
        super.init();
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
        this.rotatePerFrame(this.frame++);
    }
    draw(mode: number): void {
        this.bind()
        super.draw(mode);
    }
    rotatePerFrame(frame: number) {
        this.getEntity().get(TRS).getPosition().set(-3, 2, -5, 1);
        const rotationMatrix = Matrix.rotationX(Math.PI / 180 * frame).multiply(Matrix.rotationY(Math.PI / 180 * frame)).multiply(Matrix.rotationZ(Math.PI / 180 * frame));
        Matrix.quatFromRotationMatrix(rotationMatrix, this.getEntity().get(TRS).getRotation());
    }

}

