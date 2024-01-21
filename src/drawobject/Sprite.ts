import { flatten, Vec4 } from "../geometry/Vector.js";
import DrawObject from "./DrawObject.js";
import Quad from "../geometry/Quad.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";

export default class Sprite extends DrawObject {
    private readonly rect: Vec4 = new Vec4(0, 0, 1, 1);
    getRect(): Vec4 {
        return this.rect;
    }
    initContextObjects() {

        super.initContextObjects();
        const quad = new Quad(this.rect.x, this.rect.y, this.rect.z, this.rect.w);
        quad.initTexCoords();
        const vertices: Vec4[] = []
        const colors: Vec4[] = []
        const indices: number[] = []
        const texcoords: Vec4[] = []
        quad.appendTo(vertices, colors, indices, texcoords);

        this.createABO(ArrayBufferIndex.Position, flatten(vertices), 4);
        this.createABO(ArrayBufferIndex.Color, flatten(colors), 4);
        this.createABO(ArrayBufferIndex.TextureCoord, flatten(texcoords), 4);
        this.updateEBO(new Uint16Array(indices));
    }
}