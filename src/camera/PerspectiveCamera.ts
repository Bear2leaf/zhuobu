import Matrix from "../math/Matrix.js";
import { Vec3 } from "../math/Vector.js";
import Camera from "./Camera.js";



export class PerspectiveCamera implements Camera {
    private view?: Matrix;
    private projection?: Matrix;
    private width?: number;
    private height?: number;
    

    init() {
        if (!this.width) {
            throw new Error("width not exist");
        }
        if (!this.height) {
            throw new Error("height not exist");
        }
        const fov = Math.PI / 180 * 90;
        const aspect = this.width / this.height;
        this.view = Matrix.lookAt(new Vec3(0, 0, 0), new Vec3(0, 0, -1), new Vec3(0, 1, 0)).inverse();
        this.projection = Matrix.perspective(fov, aspect, 1, 50);
    }
    setSize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
    getView(): Matrix {
        if (!this.view) {
            throw new Error("view not exist");
        }
        return this.view;
    }
    getProjection(): Matrix {
        if (!this.projection) {
            throw new Error("projection not exist");
        }
        return this.projection;
    }
    rotateViewPerFrame(frame: number) {
        this.getView().set(Matrix.lookAt(new Vec3(0, 0, -10), new Vec3(0, 0, 0), new Vec3(0, 1, 0)).rotateY((Math.PI / 180 * frame)));
    }
    lookAtInverse(eye: Vec3, target: Vec3, up: Vec3) {
        Matrix.lookAt(eye, target, up).inverse(this.getView());
    }
    getFrustumTransformMatrix(): Matrix {
        return this.getView().inverse()
            .multiply(this.getProjection().inverse());
    }
    getViewInverse(): Matrix {
        return this.getView().inverse();
    }
}
