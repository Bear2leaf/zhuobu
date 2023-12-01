import Matrix from "../geometry/Matrix.js";
import { Vec3, Vec4 } from "../geometry/Vector.js";
import Renderer from "../renderer/Renderer.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import { OrthoCamera } from "./OrthoCamera.js";

export class FrontgroundCamera extends OrthoCamera {

    init(): void {
        super.init();
        this.getSceneManager().all().forEach(scene => scene.getComponents(SpriteRenderer).forEach(comp => comp.getEntity().get(Renderer).setCamera(this)));
        this.getView().set(Matrix.lookAt(new Vec3(0, 0, -11), new Vec3(0, 0, -12), new Vec3(0, 1, 0)).inverse());
        this.getProjection().translate(new Vec4(0, 0, -11.5, 1));
    }

}