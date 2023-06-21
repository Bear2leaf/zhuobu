import Node from "../structure/Node.js";
import GLTexture from "../texture/GLTexture.js";
import GLArrayBufferObject from "../contextobject/GLArrayBufferObject.js";
import DrawObject from "./DrawObject.js";
import RenderingContext, { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";

export default class Pointer extends DrawObject {
    private x: number = 0;
    private y: number = 0;
    constructor(gl: RenderingContext, texture: GLTexture, onTouchStart: Function, onTouchMove: Function, onTouchEnd: Function, onTouchCancel: Function) {
        onTouchStart((e: { x: number, y: number } | undefined) => this.setPosition(e))
        onTouchMove((e: { x: number, y: number } | undefined) => this.setPosition(e))
        onTouchEnd(() => { })
        onTouchCancel(() => { })

        super(gl, texture, new Map<number, GLArrayBufferObject>(), 1);
        this.createABO(ArrayBufferIndex.Position, new Float32Array([0, 0, 0, 1]), 4)
        this.createABO(ArrayBufferIndex.Color, new Float32Array([1, 1, 1, 1]), 4)
        this.updateEBO(new Uint16Array([0]))
    }
    private setPosition(e: { x: number, y: number } | undefined) {
        if (!e) {
            throw new Error("event not exist")
        }
        this.x = e.x;
        this.y = e.y;

    }
    update(): void {
        this.bind();
        this.updateABO(ArrayBufferIndex.Position, new Float32Array([this.x, this.y, 0, 1]));
    }
    draw(mode: number): void {
        this.bind();
        super.draw(mode);
    }
}