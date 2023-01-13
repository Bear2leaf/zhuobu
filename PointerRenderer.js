import { OrthoCamera } from "./Camera.js";
import { device } from "./Device.js";
import { PointRenderer } from "./Renderer.js";
import { Vec4 } from "./Vector.js";
export default class PointerRenderer extends PointRenderer {
    constructor() {
        const windowInfo = device.getWindowInfo();
        const left = -windowInfo.windowWidth / 2;
        const right = windowInfo.windowWidth / 2;
        const bottom = windowInfo.windowHeight / 2;
        const top = -windowInfo.windowHeight / 2;
        const near = 1;
        const far = -1;
        super(new OrthoCamera(left, right, bottom, top, near, far));
        device.onTouchStart((e) => this.setPosition(e));
        device.onTouchMove((e) => this.setPosition(e));
        device.onTouchEnd(() => { });
        device.onTouchCancel(() => { });
        this.setVertices([new Vec4(0, 0, 0, 0)]);
        this.setIndices(new Array(1).fill(0).map((_, index) => index));
        this.setColors([new Vec4(1, 1, 1, 1)]);
    }
    setPosition(e) {
        if (!e) {
            throw new Error("event not exist");
        }
        const windowInfo = device.getWindowInfo();
        this.setVertices([new Vec4(e.x - windowInfo.windowWidth / 2, e.y - windowInfo.windowHeight / 2, 0, 1)]);
        this.setIndices(new Array(1).fill(0).map((_, index) => index));
    }
    render() {
        super.render();
    }
}
//# sourceMappingURL=PointerRenderer.js.map