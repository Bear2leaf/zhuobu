import RenderingContext, { ArrayBufferIndex, UniformBlockIndex } from "../renderingcontext/RenderingContext.js";
import ArrayBufferObject from "../contextobject/ArrayBufferObject.js";
import VertexArrayObject from "../contextobject/VertexArrayObject.js";
import Component from "../entity/Component.js";
import Primitive, { PrimitiveType } from "../contextobject/Primitive.js";
import Texture from "../texture/Texture.js";
import { Vec4 } from "../geometry/Vector.js";
import UniformBufferObject from "../contextobject/UniformBufferObject.js";


export default class DrawObject extends Component {
    private readonly aboMap: Map<ArrayBufferIndex, ArrayBufferObject> = new Map();
    private readonly uboMap: Map<UniformBlockIndex, UniformBufferObject> = new Map();
    private vao?: VertexArrayObject;
    private ebo?: ArrayBufferObject;
    private count: number = 0;
    private primitive?: Primitive;
    private renderingContext?: RenderingContext;
    private texture?: Texture;
    private readonly pickColor = new Vec4();
    getPickColor() {
        return this.pickColor;
    }
    getPickColorUBO() {
        const ubo = this.uboMap.get(UniformBlockIndex.PickColor);
        if (ubo === undefined) {
            throw new Error("ubo not set");
        }
        return ubo;
    }
    setTexture(texture: Texture) {
        this.texture = texture;
    }
    getTexture(): Texture {
        if (this.texture === undefined) {
            throw new Error("texture not exist");
        }
        return this.texture;
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
        this.createABO(ArrayBufferIndex.Position, new Float32Array(0), 4)
        this.createABO(ArrayBufferIndex.Color, new Float32Array(0), 4)
        this.createABO(ArrayBufferIndex.TextureCoord, new Float32Array(0), 4);
        this.pickColor.set(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255), 255);
        this.createUBO(UniformBlockIndex.PickColor)
        this.updateUBO(UniformBlockIndex.PickColor, this.pickColor.toFloatArray());
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
        this.uboMap.forEach(ubo => ubo.bind());
        this.getTexture().bind()
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
    createUBO(index: UniformBlockIndex) {
        if (!this.uboMap) {
            throw new Error("uboMap is not set");
        }

        this.uboMap.set(index, this.getRenderingContext().makeUniformBlockObject(index));
    }
    updateUBO(index: UniformBlockIndex, data: Float32Array) {
        const ubo = this.uboMap.get(index);
        if (!ubo) {
            throw new Error("ubo not exist");
        }
        ubo.updateBuffer(data);
    }
}