import Texture from "../texture/Texture.js";
import RenderingContext, { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import ArrayBufferObject from "../contextobject/ArrayBufferObject.js";
import VertexArrayObject from "../contextobject/VertexArrayObject.js";
import { TextureIndex } from "../texture/Texture.js";
import Component from "../component/Component.js";
import Entity from "../entity/Entity.js";
import GLContainer from "../component/GLContainer.js";
import TextureContainer from "../component/TextureContainer.js";


export default abstract class DrawObject implements Component {
    private readonly vao: VertexArrayObject;
    private readonly ebo: ArrayBufferObject;
    private readonly aboMap: Map<ArrayBufferIndex, ArrayBufferObject>;
    private readonly textureMap: Map<TextureIndex, Texture>;
    private readonly gl: RenderingContext;
    private count: number;
    constructor(protected readonly entity: Entity) {
        
        this.gl = entity.get(GLContainer).getRenderingContext();
        this.count = 0;
        this.aboMap = new Map<ArrayBufferIndex, ArrayBufferObject>();
        this.textureMap = new Map<TextureIndex, Texture>();
        this.vao = this.gl.makeVertexArrayObject();
        this.vao.bind();
        this.ebo = this.gl.makeElementBufferObject(new Uint16Array(0));
        this.textureMap.set(TextureIndex.Default, entity.get(TextureContainer).getTexture());
    }
    draw(mode: number) {
        this.gl.draw(mode, this.count);
    }
    protected bind() {
        this.vao.bind();
        this.textureMap.forEach((texture) => {
            texture.bind();
        });
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
    protected addTexture(index: TextureIndex, texture: Texture) {
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