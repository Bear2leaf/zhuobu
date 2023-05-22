import Matrix from "../math/Matrix.js";
import { Vec3, Vec4 } from "../math/Vector.js";

export default class TRS {
    private readonly position: Vec3;
    private readonly rotation: Vec3;
    private readonly scale: Vec3;
    constructor(position?: Vec3 | number[], rotation?: Vec4 | number[], scale?: Vec3 | number[]) {
        if (position instanceof Array) {
            position = new Vec3(...position);
        }
        if (rotation instanceof Array) {
            rotation = new Vec4(...rotation);
        }
        if (scale instanceof Array) {
            scale = new Vec3(...scale);
        }


        this.position = position || new Vec3();
        this.rotation = rotation || new Vec3();
        this.scale = scale || new Vec3(1, 1, 1);
    }
    getMatrix(dst?: Matrix) {
        dst = dst || new Matrix();
        Matrix.compose(this.position, this.rotation, this.scale, dst);
        return dst;
    }
    getPosition() {
        return this.position;
    }
    getRotation() {
        return this.rotation;
    }
    getScale() {
        return this.scale;
    }
}