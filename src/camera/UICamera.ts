import Matrix from "../math/Matrix.js";
import { Vec3, Vec4 } from "../math/Vector.js";
import { OrthoCamera } from "./OrthoCamera.js";

export class UICamera extends OrthoCamera {

    init(): void {
        super.init();
        this.getView().set(Matrix.lookAt(new Vec3(0, 0, -10), new Vec3(0, 0, -11), new Vec3(0, 1, 0)).inverse());
        this.getProjection().translate(new Vec4(0, 0, -10, 1));
    }
}