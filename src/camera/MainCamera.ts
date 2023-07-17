
import Matrix from "../math/Matrix.js";
import { Vec3 } from "../math/Vector.js";
import { PerspectiveCamera } from "./PerspectiveCamera.js";



export class MainCamera extends PerspectiveCamera {
    init(): void {
        super.init()
        this.getView().set(Matrix.lookAt(new Vec3(3, 4, 5), new Vec3(0, 0, -5), new Vec3(0, 1, 0)).inverse())
        const fov = Math.PI / 180 * 30;
        this.getProjection().set(Matrix.perspective(fov, this.getAspect(), 1, 30))
    }
}
