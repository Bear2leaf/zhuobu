import GLTexture from "../texture/GLTexture.js";
import Node from "../structure/Node.js";
import RenderingCtx, { ArrayBufferIndex } from "../renderingcontext/RenderingCtx.js";
import ArrayBufferObject from "../contextobject/ArrayBufferObject.js";
import VertexArrayObject from "../contextobject/VertexArrayObject.js";
import { TextureIndex } from "../texture/Texture.js";


export default abstract class DrawObject {
    private readonly vao: VertexArrayObject;
    private readonly ebo: ArrayBufferObject;
    private readonly aboMap: Map<ArrayBufferIndex, ArrayBufferObject>;
    private readonly textureMap: Map<TextureIndex, GLTexture>;
    private readonly gl: RenderingCtx;
    private count: number;
    constructor(gl: RenderingCtx, defaultTexture: GLTexture, aboMap: Map<ArrayBufferIndex, ArrayBufferObject>, count: number) {
        this.gl = gl;
        this.count = count;
        this.aboMap = aboMap;
        this.textureMap = new Map<TextureIndex, GLTexture>();
        this.vao = this.gl.makeVertexArrayObject();
        this.vao.bind();
        this.ebo = this.gl.makeElementBufferObject(new Uint16Array(0));
        this.textureMap.set(TextureIndex.Default, defaultTexture);
    }
    abstract update(node: Node): void;
    bind() {
        this.vao.bind();
        this.textureMap.forEach((texture) => {
            texture.bind();
        });
    }
    draw(mode: number) {
        this.gl.draw(mode, this.count);
    }

    protected updateEBO(buffer: Uint16Array) {
        this.ebo.updateBuffer(buffer);
        this.count = buffer.length;
    }
    protected createABO(index: ArrayBufferIndex, data: Float32Array | Uint16Array, szie: number) {
        this.aboMap.set(index, this.gl.makeArrayBufferObject(index, data, szie));
    }
    protected getTexture(index: TextureIndex) {
        const texture = this.textureMap.get(index);
        if (!texture) {
            throw new Error("texture not exist");
        }
        return texture;
    }
    protected addTexture(index: TextureIndex, texture: GLTexture) {
        this.textureMap.set(index, texture);
    }
    protected updateABO(index: ArrayBufferIndex, data: Float32Array) {
        const abo = this.aboMap.get(index);
        if (!abo) {
            throw new Error("abo not exist");
        }            
        abo.updateBuffer(data);
    }
}