import Texture from "../texture/Texture.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import ArrayBufferObject from "../contextobject/ArrayBufferObject.js";
import VertexArrayObject from "../contextobject/VertexArrayObject.js";
import { TextureIndex } from "../texture/Texture.js";
import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import TextureContainer from "../component/TextureContainer.js";


export default class DrawObject extends Component {
    private vao?: VertexArrayObject;
    private ebo?: ArrayBufferObject;
    private aboMap: Map<ArrayBufferIndex, ArrayBufferObject> = new Map();
    private textureMap: Map<TextureIndex, Texture> = new Map();
    private count: number = 0;
    init() {
        this.vao = this.getRenderingContext().makeVertexArrayObject();
        this.vao.bind();
        this.ebo = this.getRenderingContext().makeElementBufferObject(new Uint16Array(0));
        this.textureMap.set(TextureIndex.Default, this.getEntity().get(TextureContainer).getTexture());
    }
    draw(mode: number) {
        this.getRenderingContext().draw(mode, this.count);
    }
    protected bind() {
        if (!this.vao) {
            throw new Error("vao is not set");
        }
        this.vao.bind();
        this.textureMap.forEach((texture) => {
            texture.bind();
        });
    }
    protected getRenderingContext() {
        return this.getEntity().get(GLContainer).getRenderingContext();
    }

    protected updateEBO(buffer: Uint16Array) {
        if (!this.ebo) {
            throw new Error("ebo is not set");
        }
        this.ebo.updateBuffer(buffer);
        this.count = buffer.length;
    }
    protected createABO(index: ArrayBufferIndex, data: Float32Array | Uint16Array, szie: number) {
        if (!this.aboMap) {
            throw new Error("aboMap is not set");
        }

        this.aboMap.set(index, this.getRenderingContext().makeArrayBufferObject(index, data, szie));
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