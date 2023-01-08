import { device } from "./Device.js";
import Matrix from "./Matrix.js";
import { Vec3, Vec4 } from "./Vector.js";

export default interface Camera {
    readonly view: Matrix;
    readonly projection: Matrix;
}

export class OrthoCamera implements Camera {
    readonly view: Matrix;
    readonly projection: Matrix;

    constructor(left: number, right: number, bottom: number, top: number, near: number, far: number) {
        this.view = Matrix.lookAt(new Vec3(0, 0, 0), new Vec3(0, 0, -1), new Vec3(0, 1, 0));
        this.projection = Matrix.ortho(left, right, bottom, top, near, far);

    }

}
export class PerspectiveCamera implements Camera {
    readonly view: Matrix;
    readonly projection: Matrix;

    constructor(fieldOfViewYInRadians: number = Math.PI / 4, aspect: number = 1, zNear: number = 1, zFar: number = 2000) {
        this.view = Matrix.lookAt(new Vec3(0, 0, 4), new Vec3(0, 0, 0), new Vec3(0, 1, 0));
        this.projection = Matrix.perspective(fieldOfViewYInRadians, aspect, zNear, zFar);
    }

}