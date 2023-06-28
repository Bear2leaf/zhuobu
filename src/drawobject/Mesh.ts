import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import Entity from "../entity/Entity.js";

export default class Mesh extends DrawObject {
    constructor(entity: Entity) {
        super(entity);
    }
    setMeshData(indices: Uint16Array, position: Float32Array, normal: Float32Array) {

        this.updateEBO(indices);
        this.createABO(ArrayBufferIndex.Position, position, 3);
        this.createABO(ArrayBufferIndex.Normal, normal, 3);
    }
    draw(mode: number): void {
        this.bind()
        super.draw(mode);
    }
    update(): void {
    }
}