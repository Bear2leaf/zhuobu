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
    abstract readPixels(x: number, y: number, width: number, height: number): Uint8Array
    abstract fillWithColor(r: number, g: number, b: number):void;
    abstract clearRect(x: number, y: number, width: number, height: number): void
    abstract fillWithText(text: string): void;
}