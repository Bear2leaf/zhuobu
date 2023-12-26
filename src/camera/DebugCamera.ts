
import Matrix from "../geometry/Matrix.js";
import { Vec3 } from "../geometry/Vector.js";
import { PerspectiveCamera } from "./PerspectiveCamera.js";



export class DebugCamera extends PerspectiveCamera {
    getView(): Matrix {
        return Matrix.lookAt(new Vec3(5, 7, 10), new Vec3(0, 0, 0), new Vec3(0, 1, 0));
    }
    getProjection(): Matrix {
        return Matrix.perspective(Math.PI / 180 * 90, this.getAspect(), 1, 50);
    }
}
