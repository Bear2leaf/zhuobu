import GLContainer from "../component/GLContainer.js";
import TRS from "../component/TRS.js";
import Mesh from "./Mesh.js";

export default class HelloWireframe extends Mesh {
    init(): void {
        super.init();
        this.getEntity().get(TRS).getPosition().set(0, 4, -10, 1);
    }
    draw(mode: number): void {
        this.getEntity().get(GLContainer).getRenderingContext().switchBlend(true);
        this.getEntity().get(GLContainer).getRenderingContext().switchDepthTest(false);
        this.getEntity().get(GLContainer).getRenderingContext().switchCulling(false);
        super.draw(mode);
        this.getEntity().get(GLContainer).getRenderingContext().switchCulling(true);
        this.getEntity().get(GLContainer).getRenderingContext().switchDepthTest(true);
        this.getEntity().get(GLContainer).getRenderingContext().switchBlend(false);
    }
}