import RenderingContext from "../renderingcontext/RenderingContext.js";

export default interface OffscreenCanvas {
    setContext(context: RenderingContext): void;
}