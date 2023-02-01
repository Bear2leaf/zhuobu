import { device } from "./Device.js";
import Matrix from "./Matrix.js";
import { Vec3 } from "./Vector.js";
const windowInfo = device.getWindowInfo();
export class OrthoCamera {
    constructor(left, right, bottom, top, near, far) {
        this.view = Matrix.lookAt(new Vec3(0, 0, 0), new Vec3(0, 0, -1), new Vec3(0, 1, 0)).inverse();
        this.projection = Matrix.ortho(left, right, bottom, top, near, far);
    }
}
export class PerspectiveCamera {
    constructor(fieldOfViewYInRadians, aspect, zNear, zFar) {
        aspect = device.getWindowInfo().windowWidth / device.getWindowInfo().windowHeight;
        this.view = Matrix.lookAt(new Vec3(0, 0, 0), new Vec3(0, 0, -1), new Vec3(0, 1, 0)).inverse();
        this.projection = Matrix.perspective(fieldOfViewYInRadians, aspect, zNear, zFar);
    }
}
//# sourceMappingURL=Camera.js.map