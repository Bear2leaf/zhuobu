import { device } from "../Device.js";
import Point from "../geometry/Point.js";
import { Vec4 } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";

export default class Pointer extends DrawObject {
    constructor() {
        super()
        device.onTouchStart((e) => this.setPosition(e))
        device.onTouchMove((e) => this.setPosition(e))
        device.onTouchEnd(() => { })
        device.onTouchCancel(() => { })
        this.mesh = new Point(0, 0, 0, 1);
    }
    private setPosition(e: { x: number, y: number } | undefined) {
        if (!e) {
            throw new Error("event not exist")
        }
        if (!this.mesh) {
            throw new Error("mesh not exist")
        }
        this.mesh.vertices[0].x = e.x;
        this.mesh.vertices[0].y = e.y;
        
    }
}