import { device } from "./Device.js";
import Matrix from "./Matrix.js";

export default interface Camera {
    matrix: Matrix;
}

export class OrthoCamera implements Camera {
    readonly matrix: Matrix;

    constructor(left?: number, right?: number, bottom?: number, top?: number, near?: number, far?: number) {
        const windowInfo = device.getWindowInfo();
        left = left || - windowInfo.windowWidth / 2;
        right = right || windowInfo.windowWidth / 2;
        bottom = bottom || windowInfo.windowHeight / 2;
        top = top || - windowInfo.windowHeight / 2;
        near = near || 1;
        far = far || -1;
        this.matrix = new Matrix(
            2 / (right - left), 0, 0, 0,
            0, 2 / (top - bottom), 0, 0,
            0, 0, 2 / (near - far), 0,
            (right + left) / (left - right), (top + bottom) / (bottom - top), (far + near) / (near - far), 1
        );
    }

}
export class PerspectiveCamera implements Camera {
    readonly matrix: Matrix;

    constructor(fieldOfViewYInRadians: number = Math.PI / 4, aspect: number = 1, zNear: number = 1 , zFar: number = 2000) {
        const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewYInRadians);
        const rangeInv = 1.0 / (zNear - zFar);
        this.matrix = new Matrix(
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (zNear + zFar) * rangeInv, -1,
            0, 0, zNear * zFar * rangeInv * 2, 0
        );
    }

}