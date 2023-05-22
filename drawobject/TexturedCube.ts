import Cube from "../geometry/Cube.js";
import Matrix from "../math/Matrix.js";
import { Vec2, Vec3, Vec4, flatten } from "../math/Vector.js";
import Node from "../structure/Node.js";
import Texture from "../texture/Texture.js";
import ArrayBufferObject, { ArrayBufferIndex } from "./ArrayBufferObject.js";
import DrawObject from "./DrawObject.js";

export default class TexturedCube extends DrawObject {
    constructor(gl: WebGL2RenderingContext, texture: Texture) {
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


        super(gl, texture, new Map<number, ArrayBufferObject>(), indices.length);
        this.createABO(ArrayBufferIndex.Position, flatten(vertices), 4);
        this.createABO(ArrayBufferIndex.Color, flatten(colors), 4);
        this.createABO(ArrayBufferIndex.TextureCoord, flatten(textureCoords), 2);
        this.updateEBO(new Uint16Array(indices))
    }
    update(): void {
        
    }
    draw(mode: number): void {
        this.bind()
        super.draw(mode);
    }
    setInitPosition() {
        // this.getNode().getWorldMatrix().set(Matrix.translation(new Vec3(0, -1, -8)))
    }
    rotatePerFrame(frame: number) {
        this.setInitPosition();
        // this.getNode().getWorldMatrix().rotateY(Math.PI / 180 * frame).rotateX(Math.PI / 180 * frame).rotateZ(Math.PI / 180 * frame);
    }

}

