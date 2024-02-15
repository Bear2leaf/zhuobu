
import Matrix from "../geometry/Matrix.js";
import { Vec3, Vec4 } from "../geometry/Vector.js";
import { PerspectiveCamera } from "./PerspectiveCamera.js";



export class MainCamera extends PerspectiveCamera {
    private reflected = false;
    private readonly eye = new Vec4(0.5, 0.5, 0.5, 1);
    private readonly target = new Vec4(0, 0, 0, 1);
    private readonly up = new Vec4(0, 1, 0, 1);
    private readonly projection = Matrix.identity();
    private fov = Math.PI / 4;
    private near = 0.1;
    private far = 10;
    init(): void {
        super.init()
        this.getProjection().set(Matrix.perspective(this.fov, this.getAspect(), this.near, this.far))
    }
    reflect(enable: boolean = false) {
        this.reflected = enable;
    }
    getView(): Matrix {
        const eye = this.getEye();
        if (this.reflected) {
            return Matrix.lookAt(new Vec3(eye.x, -eye.y, eye.z), new Vec3(this.target.x, -this.target.y, this.target.z), this.up)
        } else {
            return Matrix.lookAt(eye, this.target.clone(), this.up)
        }
    }
    getEye(): Vec3 {
        return this.eye;
    }
    getNear() {
        return this.near;
    }
    getFar() {
        return this.far;
    }
    getFov() {
        return this.fov;
    }
    fromGLTF(target: Vec3, position: Vec3, fov: number, near: number, far: number) {
        this.near = near;
        this.far = far;
        this.fov = fov;
        this.projection.set(Matrix.perspective(this.fov, this.getAspect(), this.near, this.far));
        this.eye.set(position.x, position.y, position.z, 1);
        this.target.set(target.x, target.y, target.z, 1);
    }
    rotateViewPerFrame(time: number) {
        this.getEye().x = Math.sin(time) * 10;
        this.getEye().z = -Math.cos(time) * 10;
        this.getEye().y = -Math.sin(time) * 5 + 6;
    }
    getProjection(): Matrix {
        return this.projection;
    }
}
