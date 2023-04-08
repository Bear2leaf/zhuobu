import { device } from "../Device.js";
import { flatten, Vec4 } from "../math/Vector.js";
import { ArrayBufferIndex } from "./ArrayBufferIndex.js";
import DrawObject from "./DrawObject.js";

export default class Pointer extends DrawObject {
    private x: number = 0;
    private y: number = 0;
    constructor() {
        device.onTouchStart((e) => this.setPosition(e))
        device.onTouchMove((e) => this.setPosition(e))
        device.onTouchEnd(() => { })
        device.onTouchCancel(() => { })
        super([new Vec4(1, 1, 1, 1)], [0], [new Vec4(0, 0, 0, 1)])
    }
    private setPosition(e: { x: number, y: number } | undefined) {
        if (!e) {
            throw new Error("event not exist")
        }
        this.x = e.x;
        this.y = e.y;

    }
    draw(mode: number): void {

        this.aboMap.get(ArrayBufferIndex.Vertices)!.update(new Float32Array([this.x, this.y, 0, 1]), new Uint16Array([0]));
        super.draw(mode);
    }
}