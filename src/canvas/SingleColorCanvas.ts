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
    readOnePixel(x: number, y: number) {
        return this.getContext().readSinglePixel(x, y)
    }
    fillWithColor(r: number, g: number, b: number) {
        const context = this.getContext();
        context.clear(r, g, b);
    }
    clearRect(x: number, y: number, width: number, height: number) {
        const context = this.getContext();
        context.clearRect(x, y, width, height);
    }
    fillWithText(text: string) {
        const context = this.getContext();
        context.updateFont("48px serif", "alphabetic", "left", "chocolate");
        context.putText(text);
    }

}