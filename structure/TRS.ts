import Matrix from "../math/Matrix.js";
import { Vec3 } from "../math/Vector.js";

export default class TRS {
    position: Vec3;
    rotation: Vec3;
    scale: Vec3;
    constructor(position?: Vec3 | number[], rotation?: Vec3 | number[], scale?: Vec3 | number[]) {
        if (position instanceof Array) {
            position = new Vec3(...position);
        }
        if (rotation instanceof Array) {
            rotation = new Vec3(...rotation);
        }
        if (scale instanceof Array) {
            scale = new Vec3(...scale);
        }


        this.position = position || new Vec3();
        this.rotation = rotation || new Vec3();
        this.scale = scale || new Vec3(1, 1, 1);
    }
    getMatrix(dst: Matrix) {
        dst = dst || new Matrix();
        Matrix.compose(this.position, this.rotation, this.scale, dst);
        return dst;
    }
}