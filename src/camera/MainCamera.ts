
import Matrix from "../geometry/Matrix.js";
import { Vec3 } from "../geometry/Vector.js";
import Renderer from "../renderer/Renderer.js";
import { PerspectiveCamera } from "./PerspectiveCamera.js";



export class MainCamera extends PerspectiveCamera {
    init(): void {
        super.init()
        this.getSceneManager().all().forEach((scene) => {
            scene.getComponents(Renderer).forEach((renderer) => {
                renderer.setCamera(this);
            });
        });
        this.getView().set(Matrix.lookAt(new Vec3(2, 5, 7), new Vec3(0, 2, 0), new Vec3(0, 1, 0)).inverse())
        const fov = Math.PI / 180 * 60;
        this.getProjection().set(Matrix.perspective(fov, this.getAspect(), 1, 30))
    }
}
