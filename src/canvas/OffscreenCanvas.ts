import { Vec4 } from "../geometry/Vector.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";

export default abstract class OffscreenCanvas {
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
    abstract readOnePixel(x: number, y: number): Vec4
    abstract fillWithColor(r: number, g: number, b: number):void;
    abstract clearRect(x: number, y: number, width: number, height: number): void
    abstract fillWithText(text: string): void;
}