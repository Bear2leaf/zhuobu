import RenderingContext, { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import ArrayBufferObject from "../contextobject/ArrayBufferObject.js";
import VertexArrayObject from "../contextobject/VertexArrayObject.js";
import Component from "../entity/Component.js";
import Primitive, { PrimitiveType } from "../contextobject/Primitive.js";
import Texture, { TextureBindIndex } from "../texture/Texture.js";


export default class DrawObject extends Component {
    private vao?: VertexArrayObject;
    private ebo?: ArrayBufferObject;
    private aboMap: Map<ArrayBufferIndex, ArrayBufferObject> = new Map();
    private count: number = 0;
    private primitive?: Primitive;
    private renderingContext?: RenderingContext;
    private readonly textureMap: Map<TextureBindIndex, Texture> = new Map();
    setTexture(texture: Texture, index: TextureBindIndex = TextureBindIndex.Default) {
        this.textureMap.set(index, texture);
    }
    getTexture(index: TextureBindIndex = TextureBindIndex.Default): Texture {
        const texture = this.textureMap.get(index);
        if (texture === undefined) {
            throw new Error("texture not exist");
        }
        return texture;
    }
    setPrimitive(primitive: Primitive) {
        this.primitive = primitive;
    }
    getPrimitive() {
        if (!this.primitive) {
            throw new Error("primitive not exist");
        }
        return this.primitive;
    }
    init() {
        this.setPrimitive(this.getRenderingContext().makePrimitive(PrimitiveType.TRIANGLES));
        this.vao = this.getRenderingContext().makeVertexArrayObject();
        this.vao.bind();
        this.ebo = this.getRenderingContext().makeElementBufferObject(new Uint16Array(0));
    }
    draw() {
        this.getRenderingContext().draw(this.getPrimitive().getMode(), this.count);
    }
    bind() {
        if (!this.vao) {
            throw new Error("vao is not set");
        }
        this.vao.bind();
        this.textureMap.forEach(texture => texture.bind());
    }
    getRenderingContext() {
        if (!this.renderingContext) {
            throw new Error("renderingContext is not set");
        }
        return this.renderingContext;
    }
    setRenderingContext(renderingContext: RenderingContext) {
        this.renderingContext = renderingContext;
    }

    updateEBO(buffer: Uint16Array) {
        if (!this.ebo) {
            throw new Error("ebo is not set");
        }
        this.ebo.updateBuffer(buffer);
        this.count = buffer.length;
    }
    createABO(index: ArrayBufferIndex, data: Float32Array | Uint16Array, size: number) {
        if (!this.aboMap) {
            throw new Error("aboMap is not set");
        }

        this.aboMap.set(index, this.getRenderingContext().makeArrayBufferObject(index, data, size));
    }
    updateABO(index: ArrayBufferIndex, data: Float32Array) {
        const abo = this.aboMap.get(index);
        if (!abo) {
            throw new Error("abo not exist");
        }
        abo.updateBuffer(data);
    }
}