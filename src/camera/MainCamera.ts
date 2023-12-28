
import Matrix from "../geometry/Matrix.js";
import { Vec3, Vec4 } from "../geometry/Vector.js";
import { PerspectiveCamera } from "./PerspectiveCamera.js";



export class MainCamera extends PerspectiveCamera {
    private reflected = false;
    private readonly eye = new Vec4(0, 8, 8, 1);
    init(): void {
        super.init()
        const fov = Math.PI / 180 * 60;
        this.getProjection().set(Matrix.perspective(fov, this.getAspect(), 1, 30))
    }
    reflect(enable: boolean = false) {
        this.reflected = enable;
    }
    getView(): Matrix {
        if (this.reflected) {
            return Matrix.lookAt(new Vec3(this.getEye().x, -this.getEye().y, this.getEye().z), new Vec3(0, 0, 0), new Vec3(0, 1, 0))
        } else {
            return Matrix.lookAt(this.getEye(), new Vec3(0, 0, 0), new Vec3(0, 1, 0))
        }
    }
    getEye(): Vec3 {
        return this.eye;
    }
    rotateViewPerFrame(time: number) {
        this.getEye().x = Math.sin(time) * 10;
        this.getEye().z = -Math.cos(time) * 10;
        this.getEye().y = -Math.sin(time) * 5 + 6;
    }
}
