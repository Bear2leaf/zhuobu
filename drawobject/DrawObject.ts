import { device } from "../device/Device.js";
import ArrayBufferObject from "./ArrayBufferObject.js";
import { ArrayBufferIndex } from "./ArrayBufferObject.js";
import Texture, { TextureIndex } from "../Texture.js";
import Node from "../structure/Node.js";


export default class DrawObject {
    private readonly vao: WebGLVertexArrayObject | null;
    private readonly ebo: WebGLBuffer | null;
    private readonly aboMap: Map<ArrayBufferIndex, ArrayBufferObject>;
    private readonly node: Node;
    private readonly textureMap: Map<TextureIndex, Texture>;
    private count: number;
    constructor(node: Node, aboMap: Map<ArrayBufferIndex, ArrayBufferObject>, count: number) {
        this.count = count;
        this.aboMap = aboMap;
        this.textureMap = new Map<TextureIndex, Texture>();
        this.vao = device.gl.createVertexArray();
        this.ebo = device.gl.createBuffer();
        device.gl.bindVertexArray(this.vao);
        this.node = node;
        const defaultTexture = new Texture(device.gl.CLAMP_TO_EDGE, device.gl.CLAMP_TO_EDGE)
        this.textureMap.set(TextureIndex.Default, defaultTexture);
        const textureImage = device.imageCache.get(`static/texture/test.png`);
        if (!textureImage) {
            throw new Error("textureImage not exist")
        }
        defaultTexture.generate(textureImage);
    }
    bind() {
        device.gl.bindVertexArray(this.vao);
    }
    draw(mode: number) {
        this.textureMap.forEach((texture, index) => {
            texture.bind();
        });
        device.gl.drawElements(mode, this.count, device.gl.UNSIGNED_SHORT, 0)
    }
    getNode() {
        return this.node;
    }

    protected updateEBO(buffer: Uint16Array) {
        device.gl.bindBuffer(device.gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        device.gl.bufferData(device.gl.ELEMENT_ARRAY_BUFFER, buffer, device.gl.STATIC_DRAW);
        this.count = buffer.length;
    }
    protected createABO(index: ArrayBufferIndex, data: Float32Array) {
        this.aboMap.set(index, new ArrayBufferObject(index, data));
    }
    protected createTexture(index: TextureIndex, texture: Texture) {
        this.textureMap.set(index, texture);
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