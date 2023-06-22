import Cube from "../geometry/Cube.js";
import Matrix from "../math/Matrix.js";
import { Vec4, flatten } from "../math/Vector.js";
import Texture from "../texture/Texture.js";
import GLArrayBufferObject from "../contextobject/GLArrayBufferObject.js";
import DrawObject from "./DrawObject.js";
import RenderingContext, { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";

export default class BlackWireCube extends DrawObject {
    constructor(gl: RenderingContext, texture: Texture) {
        const cube = new Cube(undefined, undefined, new Vec4(0, 0, 0, 1));
        const lines = cube.getLines();
        const points = cube.getPoints();
        const colors: Vec4[] = [];
        const indices: number[] = [];
        const vertices: Vec4[] = [];
        lines.forEach((line) => line.appendTo(undefined, undefined, indices));
        points.forEach((point) => {
            point.appendTo(vertices, colors);
        });

        
        super(gl, texture, new Map<number, GLArrayBufferObject>(), indices.length);
        this.createABO(ArrayBufferIndex.Position, flatten(vertices), 4)
        this.createABO(ArrayBufferIndex.Color, flatten(colors), 4)
        this.updateEBO(new Uint16Array(indices));
    }
    update(): void {
        
    }
    draw(mode: number): void {
        this.bind()
        super.draw(mode);
    }
    setWorldMatrix(matrix: Matrix) {
        // this.getNode().updateWorldMatrix(matrix);
    }
}

