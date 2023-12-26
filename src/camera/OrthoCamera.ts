import Matrix from "../geometry/Matrix.js";
import { Vec3 } from "../geometry/Vector.js";
import Camera from "./Camera.js";



export class OrthoCamera extends Camera {
    private readonly far = -1;
    private readonly near = 1;
    private readonly left = 0;
    private right = 0;
    private bottom = 0;
    private readonly top = 0;
    init() {
        if (!this.right) {
            throw new Error("width not exist");
        }
        if (!this.bottom) {
            throw new Error("height not exist");
        }

    }
    setSize(width: number, height: number) {
        this.right = width;
        this.bottom = height;
    }

    getView(): Matrix {
        return Matrix.lookAt(this.getEye(), new Vec3(0, 0, this.far), new Vec3(0, 1, 0));
    }
    getProjection(): Matrix {
        return Matrix.ortho(this.left, this.right, this.top, this.bottom, this.near, this.far);
    }
    getEye(): Vec3 {
        return new Vec3(0, 0, this.near);

    }

}
