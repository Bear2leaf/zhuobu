import Matrix from "../geometry/Matrix.js";
import { Vec3 } from "../geometry/Vector.js";
import Camera from "./Camera.js";



export class PerspectiveCamera extends Camera {
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
        const fov = Math.PI / 180 * 60;
        const aspect = this.width / this.height;
        this.view = Matrix.lookAt(new Vec3(0, 2, 8), new Vec3(0, 0, 0), new Vec3(0, 1, 0));
        this.projection = Matrix.perspective(fov, aspect, 1, 30);
    }
    setSize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
    getAspect(): number {
        if (!this.width) {
            throw new Error("width not exist");
        }
        if (!this.height) {
            throw new Error("height not exist");
        }
        return this.width / this.height;
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
