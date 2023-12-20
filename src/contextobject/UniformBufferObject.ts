import { UniformBinding } from "../renderingcontext/RenderingContext.js";

export default interface UniformBufferObject {
    updateBuffer(arrays: Float32Array): void;
    bind(index: UniformBinding): void;
}