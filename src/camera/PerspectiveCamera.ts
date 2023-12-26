import Matrix from "../geometry/Matrix.js";
import { Vec3 } from "../geometry/Vector.js";
import Camera from "./Camera.js";



export class PerspectiveCamera extends Camera {
    private width?: number;
    private height?: number;

    init() {
        if (!this.width) {
            throw new Error("width not exist");
        }
        if (!this.height) {
            throw new Error("height not exist");
        }
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
        return Matrix.lookAt(this.getEye(), new Vec3(0, 0, 0), new Vec3(0, 1, 0));
    }
    getEye(): Vec3 {
        return new Vec3(0, 4, 8);
    }
    getProjection(): Matrix {
        return Matrix.perspective(Math.PI / 180 * 60, this.getAspect(), 1, 30);
    }
}
