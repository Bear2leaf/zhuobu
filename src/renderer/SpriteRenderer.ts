
import GLContainer from "../component/GLContainer.js";
import Renderer from "./Renderer.js";

export default class SpriteRenderer extends Renderer {
    render(): void {

        this.getEntity().get(GLContainer).getRenderingContext().switchDepthWrite(false);
        this.getEntity().get(GLContainer).getRenderingContext().switchDepthTest(false);
        this.getEntity().get(GLContainer).getRenderingContext().switchBlend(true);
        this.getEntity().get(GLContainer).getRenderingContext().switchUnpackPremultiplyAlpha(true);
        super.render();
        this.getEntity().get(GLContainer).getRenderingContext().switchUnpackPremultiplyAlpha(false);
        this.getEntity().get(GLContainer).getRenderingContext().switchBlend(false);
        this.getEntity().get(GLContainer).getRenderingContext().switchDepthTest(true);
        this.getEntity().get(GLContainer).getRenderingContext().switchDepthWrite(true);
    }
}