import { Vec4 } from "../geometry/Vector.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import OffscreenCanvas from "./OffscreenCanvas.js";

export default class SingleColorCanvas implements OffscreenCanvas {
    private context?: RenderingContext;
    setContext(context: RenderingContext): void {
        this.context = context;
    }
    getContext() {
        if (this.context === undefined) {
            throw new Error("context is undefined");
        }
        return this.context;
    }
    fillWithColor(color: Vec4) {
        const context = this.getContext();
        context.clear(...color.toFloatArray());
    }

}