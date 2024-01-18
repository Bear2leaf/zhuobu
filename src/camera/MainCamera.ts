
import Matrix from "../geometry/Matrix.js";
import { Vec3, Vec4 } from "../geometry/Vector.js";
import { PerspectiveCamera } from "./PerspectiveCamera.js";



export class MainCamera extends PerspectiveCamera {
    private reflected = false;
    private readonly eye = new Vec4(4, 5, 5, 1);
    private readonly target = new Vec4(0, 0, 0, 1);
    private readonly up = new Vec4(0, 1, 0, 1);
    private readonly projection = Matrix.identity();
    private near = 1;
    private far = 30;
    init(): void {
        super.init()
        const fov = Math.PI / 180 * 60;
        this.getProjection().set(Matrix.perspective(fov, this.getAspect(), this.near, this.far))
        // this.fromGLTF(new Vec3(7.358891487121582, 4.958309173583984, 6.925790786743164), new Vec4(-0.20997299253940582, 0.3857799470424652, 0.09062844514846802, 0.8937962055206299));
    }
    reflect(enable: boolean = false) {
        this.reflected = enable;
    }
    getView(): Matrix {
        if (this.reflected) {
            return Matrix.lookAt(new Vec3(this.getEye().x, -this.getEye().y, this.getEye().z), this.target.clone(), this.up)
        } else {
            return Matrix.lookAt(this.getEye(), this.target.clone(), this.up)
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
    fromGLTF(target: Vec3, position: Vec3, fov: number, near: number, far: number) {
        this.getProjection().set(Matrix.perspective(fov, this.getAspect(), near, far));
        this.near = near;
        this.far = far;
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
