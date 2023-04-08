import { device } from "../Device.js";
import { flatten, Vec4 } from "../math/Vector.js";
import { ArrayBufferIndex } from "./ArrayBufferIndex.js";
import DrawObject from "./DrawObject.js";

export default class Pointer extends DrawObject {
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
        this.vertices[0].x = e.x;
        this.vertices[0].y = e.y;

    }
    draw(mode: number): void {

        this.arrayBufferObjects[ArrayBufferIndex.Vertices].updateArrayBuffer(flatten(this.vertices));
        this.arrayBufferObjects[ArrayBufferIndex.Colors].updateArrayBuffer(flatten(this.colors));
        this.arrayBufferObjects[ArrayBufferIndex.Vertices].updateIndices(new Uint16Array(this.indices));
        this.arrayBufferObjects[ArrayBufferIndex.Colors].updateIndices(new Uint16Array(this.indices));
        super.draw(mode);
    }
}