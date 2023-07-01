import Matrix from "../math/Matrix.js";

export default interface Camera {
    setSize(width: number, height: number): void;
    getView(): Matrix;
    getProjection(): Matrix;
}


