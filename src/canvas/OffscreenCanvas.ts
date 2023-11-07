import { Vec4 } from "../geometry/Vector.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";

export default interface OffscreenCanvas {
    setContext(context: RenderingContext): void;
    getContext(): RenderingContext
    readOnePixel(x: number, y: number): Vec4
    fillWithColor(r: number, g: number, b: number):void;
    clearRect(x: number, y: number, width: number, height: number): void
    fillWithText(text: string): void;
}