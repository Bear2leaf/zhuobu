import { PerspectiveCamera } from "../camera/PerspectiveCamera.js";
import Cone from "../geometry/Cone.js";
import Matrix from "../math/Matrix.js";
import { Vec4, flatten } from "../math/Vector.js";
import Node from "../structure/Node.js";
import Texture from "../texture/Texture.js";
import ArrayBufferObject, { ArrayBufferIndex } from "./ArrayBufferObject.js";
import DrawObject from "./DrawObject.js";

export default class BlackWireCone extends DrawObject {
    constructor(gl: WebGL2RenderingContext, texture: Texture) {
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



        super(gl, texture, new Node(), new Map<number, ArrayBufferObject>(), indices.length);
        this.createABO(ArrayBufferIndex.Vertices, flatten(vertices), 4)
        this.createABO(ArrayBufferIndex.Colors, flatten(colors), 4)
        this.updateEBO(new Uint16Array(indices));
    }
    setWorldMatrix(matrix: Matrix) {
        this.getNode().updateWorldMatrix(matrix);
    }
}

