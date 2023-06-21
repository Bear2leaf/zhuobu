import Texture from "../texture/Texture.js";
import DrawObject from "./DrawObject.js";
import RenderingContext, { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";

export default class Mesh extends DrawObject {
    constructor(gl: RenderingContext
        , texture: Texture
        , position: Float32Array
        , normal: Float32Array
        , indices: Uint16Array) {
        super(gl, texture, new Map(), indices.length);
        this.updateEBO(indices);
        this.createABO(ArrayBufferIndex.Position, position, 3);
        this.createABO(ArrayBufferIndex.Normal, normal, 3);
    }
    draw(mode: number): void {
        this.bind()
        super.draw(mode);
    }
    update(): void {
    }
}