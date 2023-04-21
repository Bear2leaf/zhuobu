import Matrix from "../math/Matrix.js";
import { device } from "../device/Device.js";
import ArrayBufferObject from "./ArrayBufferObject.js";
import { ArrayBufferIndex } from "./ArrayBufferObject.js";
import Texture, { TextureIndex } from "../Texture.js";
import Node from "../structure/Node.js";
import TRS from "../structure/TRS.js";


export default class DrawObject {
    readonly vao: WebGLVertexArrayObject | null;
    readonly ebo: WebGLBuffer | null;
    readonly aboMap: Map<ArrayBufferIndex, ArrayBufferObject>;
    readonly node: Node;
    readonly textureMap: Map<TextureIndex, Texture>;
    count: number;
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
    draw(mode: number) {
        this.textureMap.forEach((texture, index) => {
            texture.bind();
        });
        device.gl.drawElements(mode, this.count, device.gl.UNSIGNED_SHORT, 0)
    }

    updateEBO(buffer: Uint16Array) {
        device.gl.bindBuffer(device.gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        device.gl.bufferData(device.gl.ELEMENT_ARRAY_BUFFER, buffer, device.gl.STATIC_DRAW);
        this.count = buffer.length;
    }
}