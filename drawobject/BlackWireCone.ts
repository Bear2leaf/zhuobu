import { PerspectiveCamera } from "../camera/PerspectiveCamera.js";
import Cone from "../geometry/Cone.js";
import Matrix from "../math/Matrix.js";
import { Vec4, flatten } from "../math/Vector.js";
import RenderingCtx, { ArrayBufferIndex } from "../renderingcontext/RenderingCtx.js";
import Node from "../structure/Node.js";
import GLTexture from "../texture/GLTexture.js";
import GLArrayBufferObject from "../contextobject/GLArrayBufferObject.js";
import DrawObject from "./DrawObject.js";

export default class BlackWireCone extends DrawObject {
    constructor(gl: RenderingCtx, texture: GLTexture) {
        const cone = new Cone();
        const lines = cone.getLines();
        const points = cone.getPoints();
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

