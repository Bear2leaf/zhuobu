import { device } from "../Device.js";
import { Vec4 } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";

export default class Pointer extends DrawObject {
    constructor() {
        super()
        this.setVertices([new Vec4(0, 0, 0, 0)]);
        this.setIndices(new Array(1).fill(0).map((_, index) => index))
        this.setColors([new Vec4(1, 1, 1, 1)]);
        device.onTouchStart((e) => this.setPosition(e))
        device.onTouchMove((e) => this.setPosition(e))
        device.onTouchEnd(() => { })
        device.onTouchCancel(() => { })
    }
    private setPosition(e: { x: number, y: number } | undefined) {
        if (!e) {
            throw new Error("event not exist")
        }
        this.setVertices([new Vec4(e.x, e.y, 0, 1)]);
        this.setIndices(new Array(1).fill(0).map((_, index) => index))
    }
}