import { device } from "../device/Device.js";
import { flatten, Vec4 } from "../math/Vector.js";
import Node from "../structure/Node.js";
import ArrayBufferObject, { ArrayBufferIndex } from "./ArrayBufferObject.js";
import DrawObject from "./DrawObject.js";

export default class Pointer extends DrawObject {
    private x: number = 0;
    private y: number = 0;
    constructor() {
        device.onTouchStart((e) => this.setPosition(e))
        device.onTouchMove((e) => this.setPosition(e))
        device.onTouchEnd(() => { })
        device.onTouchCancel(() => { })
        
        super(new Node(), new Map<number, ArrayBufferObject>(), 1);
        this.createABO(ArrayBufferIndex.Vertices, new Float32Array([0,0,0,1]), 4)
        this.createABO(ArrayBufferIndex.Colors, new Float32Array([1,1,1,1]), 4)
        this.updateEBO(new Uint16Array([0]))
    }
    private setPosition(e: { x: number, y: number } | undefined) {
        if (!e) {
            throw new Error("event not exist")
        }
        this.x = e.x;
        this.y = e.y;

    }
    draw(mode: number): void {

        this.updateABO(ArrayBufferIndex.Vertices, new Float32Array([this.x, this.y, 0, 1]));
        super.draw(mode);
    }
}