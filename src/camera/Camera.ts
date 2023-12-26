import Matrix from "../geometry/Matrix.js";
import { Vec3 } from "../geometry/Vector.js";

export default abstract class Camera {
    abstract init(): void;
    abstract setSize(width: number, height: number): void;
    abstract getView(): Matrix;
    abstract getProjection(): Matrix;
    abstract getEye(): Vec3;

    getFrustumTransformMatrix(): Matrix {
        return this.getView().inverse()
            .multiply(this.getProjection().inverse());
    }
}


