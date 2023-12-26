
import Matrix from "../geometry/Matrix.js";
import { Vec3 } from "../geometry/Vector.js";
import { PerspectiveCamera } from "./PerspectiveCamera.js";



export class MainCamera extends PerspectiveCamera {
    private readonly normalView = Matrix.lookAt(new Vec3(0, 8, 8), new Vec3(0, 0, 0), new Vec3(0, 1, 0));
    private readonly reflectView = Matrix.lookAt(new Vec3(0, -8, 8), new Vec3(0, 0, 0), new Vec3(0, 1, 0));
    init(): void {
        super.init()
        const fov = Math.PI / 180 * 60;
        this.getProjection().set(Matrix.perspective(fov, this.getAspect(), 1, 30))
    }
    reflect(enable: boolean = false) {
        if (enable) {
            this.getView().set(this.reflectView)
        } else {
            this.getView().set(this.normalView)
        }
    }
    rotateViewPerFrame(delta: number) {
        this.normalView.rotateY((Math.PI / 180 * delta)).rotateX((Math.PI / 180 * delta)).rotateZ((Math.PI / 180 * delta))
        this.reflectView.rotateY((Math.PI / 180 * -delta)).rotateX((Math.PI / 180 * -delta)).rotateZ((Math.PI / 180 * -delta))
    }
}
