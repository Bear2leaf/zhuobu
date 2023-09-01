import Matrix from "../geometry/Matrix.js";
import { Vec3 } from "../geometry/Vector.js";
import Camera from "./Camera.js";



export class OrthoCamera extends Camera {
    private view?: Matrix;
    private projection?: Matrix;
    private width?: number;
    private height?: number;
    
    init() {
        if (!this.width) {
            throw new Error("width not exist");
        }
        if (!this.height) {
            throw new Error("height not exist");
        }
        const left = 0;
        const right = this.width;
        const bottom = this.height;
        const top = 0;
        const near = -1;
        const far = 1;
        this.view = Matrix.lookAt(new Vec3(0, 0, far), new Vec3(0, 0, near), new Vec3(0, 1, 0)).inverse();
        this.projection = Matrix.ortho(left, right, top, bottom, near, far);

    }
    setSize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    getView(): Matrix {
        if (!this.view) {
            throw new Error("view not exist");
        }
        return this.view;
    }
    getProjection(): Matrix {
        if (!this.projection) {
            throw new Error("projection not exist");
        }
        return this.projection;
    }

}
