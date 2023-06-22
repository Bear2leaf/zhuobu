import Matrix from "../math/Matrix.js";

export default interface Camera {
    getView(): Matrix;
    getProjection(): Matrix;
}


