import { device } from "../Device.js";
import { flatten, Vec4 } from "../math/Vector.js";
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
        
        super(new Map<number, ArrayBufferObject>(), 1);
        this.aboMap.set(ArrayBufferIndex.Vertices, new ArrayBufferObject(ArrayBufferIndex.Vertices, new Float32Array([0,0,0,1])))
        this.aboMap.set(ArrayBufferIndex.Colors, new ArrayBufferObject(ArrayBufferIndex.Colors, new Float32Array([1,1,1,1])))
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

        this.aboMap.get(ArrayBufferIndex.Vertices)!.update(new Float32Array([this.x, this.y, 0, 1]));
        super.draw(mode);
    }
}