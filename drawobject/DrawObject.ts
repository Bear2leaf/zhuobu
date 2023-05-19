import device from "../device/Device.js";
import ArrayBufferObject from "./ArrayBufferObject.js";
import { ArrayBufferIndex } from "./ArrayBufferObject.js";
import Texture, { TextureIndex } from "../texture/Texture.js";
import Node from "../structure/Node.js";


export default class DrawObject {
    private readonly vao: WebGLVertexArrayObject | null;
    private readonly ebo: WebGLBuffer | null;
    private readonly aboMap: Map<ArrayBufferIndex, ArrayBufferObject>;
    private readonly node: Node;
    private readonly textureMap: Map<TextureIndex, Texture>;
    private readonly gl: WebGL2RenderingContext;
    private count: number;
    constructor(gl: WebGL2RenderingContext, defaultTexture: Texture, node: Node, aboMap: Map<ArrayBufferIndex, ArrayBufferObject>, count: number) {
        this.gl = gl;
        this.count = count;
        this.aboMap = aboMap;
        this.textureMap = new Map<TextureIndex, Texture>();
        this.vao = this.gl.createVertexArray();
        this.ebo = this.gl.createBuffer();
        this.gl.bindVertexArray(this.vao);
        this.node = node;
        this.textureMap.set(TextureIndex.Default, defaultTexture);
    }
    bind() {
        this.gl.bindVertexArray(this.vao);
    }
    draw(mode: number) {
        this.textureMap.forEach((texture, index) => {
            texture.bind();
        });
        this.gl.drawElements(mode, this.count, this.gl.UNSIGNED_SHORT, 0)
    }
    getNode() {
        return this.node;
    }

    protected updateEBO(buffer: Uint16Array) {
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, buffer, this.gl.STATIC_DRAW);
        this.count = buffer.length;
    }
    protected createABO(index: ArrayBufferIndex, data: Float32Array, szie: number) {
        this.aboMap.set(index, new ArrayBufferObject(this.gl, index, data, szie));
    }
    protected getTexture(index: TextureIndex) {
        const texture = this.textureMap.get(index);
        if (!texture) {
            throw new Error("texture not exist");
        }
        return texture;
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