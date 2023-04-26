import Matrix from "../math/Matrix.js";
import { Vec3 } from "../math/Vector.js";
import Camera from "./Camera.js";



export class OrthoCamera implements Camera {
    private readonly view: Matrix;
    private readonly projection: Matrix;

    constructor(left: number, right: number, bottom: number, top: number, near: number, far: number) {

        this.view = Matrix.lookAt(new Vec3(0, 0, 0), new Vec3(0, 0, -1), new Vec3(0, 1, 0)).inverse();
        this.projection = Matrix.ortho(left, right, bottom, top, near, far);

    }
    getView(): Matrix {
        return this.view;
    }
    getProjection(): Matrix {
        return this.projection;
    }

}
