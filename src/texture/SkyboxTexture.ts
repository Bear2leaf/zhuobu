import GLTexture from "./GLTexture.js";
import { SkyboxArray } from "../renderingcontext/RenderingContext.js";

export default class SkyboxTexture extends GLTexture {
    generate(data: SkyboxArray): void {
        const rc = this.getContext();
        rc.bindSkyboxTexture(this.getTextureIndex())
        rc.texImage2D_RGBA_RGBA_Skybox(data);
    }
    bind(): void {
        const rc = this.getContext();
        rc.bindSkyboxTexture(this.getTextureIndex())
    }
}