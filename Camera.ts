import { device } from "./Device.js";
import Matrix from "./Matrix.js";
import { Vec3, Vec4 } from "./Vector.js";

export default interface Camera {
    readonly view: Matrix;
    readonly projection: Matrix;
}

export class BaseCamera implements Camera {
    readonly view: Matrix;
    readonly projection: Matrix;
    private followPoint: Vec3;

    constructor(left: number, right: number, bottom: number, top: number, near: number, far: number) {
        this.followPoint = new Vec3(0, 0, 0);
        this.view = Matrix.lookAt(new Vec3(0, 0, 0), new Vec3(0, 0, -1), new Vec3(0, 1, 0)).inverse();
        this.projection = Matrix.ortho(left, right, bottom, top, near, far);

    }
    follow(point: Vec3) {
        this.followPoint = point;
    }
    update() {
        // damp the camera movement
        this.followPoint = this.followPoint.clone().lerp(this.followPoint, 0.5);
        this.view.set(Matrix.lookAt(this.followPoint, new Vec3(0, 0, -1), new Vec3(0, 1, 0)).inverse());

    }
}

const windowInfo = device.getWindowInfo();
export class OrthoCamera implements Camera {
    readonly view: Matrix;
    readonly projection: Matrix;

    constructor(left: number, right: number, bottom: number, top: number, near: number, far: number) {
        
        this.view = Matrix.lookAt(new Vec3(0, 0, 0), new Vec3(0, 0, -1), new Vec3(0, 1, 0)).inverse();
        this.projection = Matrix.ortho(left, right, bottom, top, near, far);

    }

}
export class PerspectiveCamera implements Camera {
    readonly view: Matrix;
    readonly projection: Matrix;

    constructor(fieldOfViewYInRadians: number, aspect: number, zNear: number, zFar: number) {
        aspect = device.getWindowInfo().windowWidth / device.getWindowInfo().windowHeight;
        this.view = Matrix.lookAt(new Vec3(0, 0, 0), new Vec3(0, 0, -1), new Vec3(0, 1, 0)).inverse();
        this.projection = Matrix.perspective(fieldOfViewYInRadians, aspect, zNear, zFar);
    }

}