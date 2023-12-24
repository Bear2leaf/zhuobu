import Matrix from "../geometry/Matrix.js";

export default abstract class Camera {
    abstract init(): void;
    abstract setSize(width: number, height: number): void;
    abstract getView(): Matrix;
    abstract getProjection(): Matrix;

    getFrustumTransformMatrix(): Matrix {
        return this.getView().inverse()
            .multiply(this.getProjection().inverse());
    }
}


