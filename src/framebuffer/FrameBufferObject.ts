import RenderingContext from "../contextobject/RenderingContext.js";
import Texture from "../texture/Texture.js";

export default interface FrameBufferObject {
    create(rc: RenderingContext): void;
    attach(texture: Texture): void;
    unbind(): void;
    bind(): void;
    bindPick(): void;
    unbindPick(): void;
}