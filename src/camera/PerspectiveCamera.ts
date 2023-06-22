import Matrix from "../math/Matrix.js";
import { Vec3 } from "../math/Vector.js";
import Camera from "./Camera.js";



export class PerspectiveCamera implements Camera {
    private readonly view: Matrix;
    private readonly projection: Matrix;

    constructor(fieldOfViewYInRadians: number, aspect: number, zNear: number, zFar: number) {
        this.view = Matrix.lookAt(new Vec3(0, 0, 0), new Vec3(0, 0, -1), new Vec3(0, 1, 0)).inverse();
        this.projection = Matrix.perspective(fieldOfViewYInRadians, aspect, zNear, zFar);
    }
    getView(): Matrix {
        return this.view;
    }
    getProjection(): Matrix {
        return this.projection;
    }
    rotateViewPerFrame(frame: number) {
        this.view.set(Matrix.lookAt(new Vec3(0, 0, -10), new Vec3(0, 0, 0), new Vec3(0, 1, 0)).rotateY((Math.PI / 180 * frame)));
    }
    lookAtInverse(eye: Vec3, target: Vec3, up: Vec3) {
        Matrix.lookAt(eye, target, up).inverse(this.view);
    }
    getFrustumTransformMatrix(): Matrix {
        return this.view.inverse()
            .multiply(this.projection.inverse());
    }
    getViewInverse(): Matrix {
        return this.view.inverse();
    }
}
