import { device } from "./Device.js";
import Matrix from "./Matrix.js";
import { Vec3 } from "./Vector.js";
export class OrthoCamera {
    constructor(left, right, bottom, top, near, far) {
        this.view = Matrix.lookAt(new Vec3(0, 0, 0), new Vec3(0, 0, -1), new Vec3(0, 1, 0));
        this.projection = Matrix.ortho(left, right, bottom, top, near, far);
    }
}
export class PerspectiveCamera {
    constructor(fieldOfViewYInRadians = Math.PI / 4, aspect = 1, zNear = 1, zFar = 2000) {
        aspect = device.getWindowInfo().windowWidth / device.getWindowInfo().windowHeight;
        this.view = Matrix.lookAt(new Vec3(0, 0, 4), new Vec3(0, 0, 0), new Vec3(0, 1, 0));
        this.projection = Matrix.perspective(fieldOfViewYInRadians, aspect, zNear, zFar);
    }
}
//# sourceMappingURL=Camera.js.map