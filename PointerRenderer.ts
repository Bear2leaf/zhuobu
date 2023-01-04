import { device } from "./Device.js";
import { PointRenderer } from "./Renderer.js";
import { Vec4 } from "./Vector.js";

export default class PointerRenderer extends PointRenderer {
    constructor() {
        super();
        device.onTouchStart((e) => {
            if (!e) {
                throw new Error("event not exist")
            }
            this.setPosition(e.x, e.y);
        })
        device.onTouchMove((e) => {
            if (!e) {
                throw new Error("event not exist")
            }
            this.setPosition(e.x, e.y);
        })
        device.onTouchEnd(() => {})
        device.onTouchCancel(() => {})
        this.setVertices([new Vec4(0, 0, 0, 0)]);
        this.setColors([new Vec4(1, 1, 1, 1)]);
    }
    private setPosition(x: number, y: number) {
        const windowInfo = device.getWindowInfo();
        this.setVertices([new Vec4(x / windowInfo.windowWidth * 2 - 1, 1 - y / windowInfo.windowHeight * 2, 0, 1)]);
    }
    render(): void {
        device.clearRenderer();
        super.render();
    }
}