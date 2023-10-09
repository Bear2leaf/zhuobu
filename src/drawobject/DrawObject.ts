import { ArrayBufferIndex } from "../contextobject/RenderingContext.js";
import ArrayBufferObject from "../contextobject/ArrayBufferObject.js";
import VertexArrayObject from "../contextobject/VertexArrayObject.js";
import Component from "../component/Component.js";
import GLContainer from "../container/GLContainer.js";
import TextureContainer from "../container/TextureContainer.js";


export default class DrawObject extends Component {
    private vao?: VertexArrayObject;
    private ebo?: ArrayBufferObject;
    private aboMap: Map<ArrayBufferIndex, ArrayBufferObject> = new Map();
    private count: number = 0;
    init() {
        this.vao = this.getRenderingContext().makeVertexArrayObject();
        this.vao.bind();
        this.ebo = this.getRenderingContext().makeElementBufferObject(new Uint16Array(0));
    }
    draw(mode: number) {
        this.getRenderingContext().draw(mode, this.count);
    }
    bind() {
        if (!this.vao) {
            throw new Error("vao is not set");
        }
        this.vao.bind();
        this.getEntity().get(TextureContainer).getTextures().forEach(texture => texture.bind());
    }
    getRenderingContext() {
        return this.getEntity().get(GLContainer).getRenderingContext();
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