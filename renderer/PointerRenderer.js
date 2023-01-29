import { OrthoCamera } from "../Camera.js";
import { device } from "../Device.js";
import { PointRenderer } from "./PointRenderer.js";
import { Vec4 } from "../Vector.js";
import Pointer from "../drawobject/Pointer.js";
const windowInfo = device.getWindowInfo();
export default class PointerRenderer extends PointRenderer {
    constructor() {
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
        this.drawObjects.push(new Pointer());
    }
    setPosition(e) {
        if (!e) {
            throw new Error("event not exist");
        }
        this.drawObjects[0].setVertices([new Vec4(e.x - windowInfo.windowWidth / 2, e.y - windowInfo.windowHeight / 2, 0, 1)]);
        this.drawObjects[0].setIndices(new Array(1).fill(0).map((_, index) => index));
    }
}
//# sourceMappingURL=PointerRenderer.js.map