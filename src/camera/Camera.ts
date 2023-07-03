import Matrix from "../math/Matrix.js";

export default interface Camera {
    init(): void;
    setSize(width: number, height: number): void;
    getView(): Matrix;
    getProjection(): Matrix;
}


