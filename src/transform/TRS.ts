import Matrix from "../geometry/Matrix.js";
import { Vec3 } from "../geometry/Vector.js";
import { Component } from "../entity/Entity.js";

export default class TRS extends Component {
    private readonly position: Vec3 = new Vec3();
    private readonly rotation: Vec3 = new Vec3();
    private readonly scale: Vec3 = new Vec3(1, 1, 1);
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