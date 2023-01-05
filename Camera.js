import { device } from "./Device.js";
import Matrix from "./Matrix.js";
export class OrthoCamera {
    constructor(left, right, bottom, top, near, far) {
        const windowInfo = device.getWindowInfo();
        left = left || -windowInfo.windowWidth / 2;
        right = right || windowInfo.windowWidth / 2;
        bottom = bottom || windowInfo.windowHeight / 2;
        top = top || -windowInfo.windowHeight / 2;
        near = near || 1;
        far = far || -1;
        this.matrix = new Matrix(2 / (right - left), 0, 0, 0, 0, 2 / (top - bottom), 0, 0, 0, 0, 2 / (near - far), 0, (right + left) / (left - right), (top + bottom) / (bottom - top), (far + near) / (near - far), 1);
    }
}
export class PerspectiveCamera {
    constructor(fieldOfViewYInRadians = Math.PI / 4, aspect = 1, zNear = 1, zFar = 2000) {
        const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewYInRadians);
        const rangeInv = 1.0 / (zNear - zFar);
        this.matrix = new Matrix(f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (zNear + zFar) * rangeInv, -1, 0, 0, zNear * zFar * rangeInv * 2, 0);
    }
}
//# sourceMappingURL=Camera.js.map