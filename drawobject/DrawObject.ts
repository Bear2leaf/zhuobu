import ArrayBufferObject from "./ArrayBufferObject.js";
import { ArrayBufferIndex } from "./ArrayBufferObject.js";
import Texture, { TextureIndex } from "../texture/Texture.js";
import Node from "../structure/Node.js";


export default abstract class DrawObject {
    private readonly vao: WebGLVertexArrayObject | null;
    private readonly ebo: WebGLBuffer | null;
    private readonly aboMap: Map<ArrayBufferIndex, ArrayBufferObject>;
    private readonly textureMap: Map<TextureIndex, Texture>;
    private readonly gl: WebGL2RenderingContext;
    private count: number;
    constructor(gl: WebGL2RenderingContext, defaultTexture: Texture, aboMap: Map<ArrayBufferIndex, ArrayBufferObject>, count: number) {
        this.gl = gl;
        this.count = count;
        this.aboMap = aboMap;
        this.textureMap = new Map<TextureIndex, Texture>();
        this.vao = this.gl.createVertexArray();
        this.ebo = this.gl.createBuffer();
        this.gl.bindVertexArray(this.vao);
        this.textureMap.set(TextureIndex.Default, defaultTexture);
    }
    abstract update(node: Node): void;
    bind() {
        this.gl.bindVertexArray(this.vao);
        this.textureMap.forEach((texture) => {
            texture.bind();
        });
    }
    draw(mode: number) {
        this.gl.drawElements(mode, this.count, this.gl.UNSIGNED_SHORT, 0)
    }

    protected updateEBO(buffer: Uint16Array) {
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, buffer, this.gl.STATIC_DRAW);
        this.count = buffer.length;
    }
    protected createABO(index: ArrayBufferIndex, data: Float32Array | Uint16Array, szie: number) {
        this.aboMap.set(index, new ArrayBufferObject(this.gl, index, data, szie));
    }
    protected getTexture(index: TextureIndex) {
        const texture = this.textureMap.get(index);
        if (!texture) {
            throw new Error("texture not exist");
        }
        return texture;
    }
    protected addTexture(index: TextureIndex, texture: Texture) {
        this.textureMap.set(index, texture);
    }
    protected updateABO(index: ArrayBufferIndex, data: Float32Array) {
        const abo = this.aboMap.get(index);
        if (!abo) {
            throw new Error("abo not exist");
        }            
        abo.update(data);
    }
    protected setCount(count: number) {
        this.count = count;
    }
}