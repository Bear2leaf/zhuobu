
import Component from "../entity/Component.js";
import RenderingContext from "../contextobject/RenderingContext.js";

export default class GLContainer extends Component {
    private rc?: RenderingContext;
    setRenderingContext(rc: RenderingContext) {
        this.rc = rc;
    }
    getRenderingContext(): RenderingContext {
        if (this.rc === undefined) {
            throw new Error("Rendering context is not set");
        }
        return this.rc;
    }
}