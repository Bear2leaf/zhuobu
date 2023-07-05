
import Component from "../component/Component.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";

export default class GLContainer extends Component {
    private gl?: RenderingContext;
    setRenderingContext(gl: RenderingContext) {
        this.gl = gl;
    }
    getRenderingContext(): RenderingContext {
        if (this.gl === undefined) {
            throw new Error("Rendering context is not set");
        }
        return this.gl;
    }
}