import Matrix from "../math/Matrix.js";
import { Vec3, Vec4 } from "../math/Vector.js";
import { OrthoCamera } from "./OrthoCamera.js";

export class BackgroundCamera extends OrthoCamera {
    init(): void {
        super.init();
        this.getView().set(Matrix.lookAt(new Vec3(0, 0, -15), new Vec3(0, 0, -16), new Vec3(0, 1, 0)).inverse());
        this.getProjection().translate(new Vec4(0, 0, -15.99, 1));
    }
    
}