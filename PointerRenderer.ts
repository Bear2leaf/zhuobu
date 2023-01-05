import { device } from "./Device.js";
import { PointRenderer } from "./Renderer.js";
import { Vec4 } from "./Vector.js";

export default class PointerRenderer extends PointRenderer {
    constructor() {
        super();
        device.onTouchStart((e) => this.setPosition(e))
        device.onTouchMove((e) => this.setPosition(e))
        device.onTouchEnd(() => { })
        device.onTouchCancel(() => { })
        this.setVertices([new Vec4(0, 0, 0, 0)]);
        this.setColors([new Vec4(1, 1, 1, 1)]);
    }
    private setPosition(e: { x: number, y: number } | undefined) {
        if (!e) {
            throw new Error("event not exist")
        }
        const windowInfo = device.getWindowInfo();
        this.setVertices([new Vec4(e.x - windowInfo.windowWidth / 2, e.y - windowInfo.windowHeight / 2, 0, 1)]);
    }
    render(): void {
        device.clearRenderer();
        super.render();
    }
}