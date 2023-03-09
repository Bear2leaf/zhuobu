import { device } from "../Device.js";
import { flatten, Vec4 } from "../math/Vector.js";
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

        device.gl.bindBuffer(device.gl.ARRAY_BUFFER, this.vbo)
        device.gl.bindBuffer(device.gl.ELEMENT_ARRAY_BUFFER, this.ebo)
        device.gl.bufferData(device.gl.ARRAY_BUFFER, flatten([...this.vertices, ...this.colors]), device.gl.STATIC_DRAW);
        device.gl.bufferData(device.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), device.gl.STATIC_DRAW)
        super.draw(mode);
    }
}