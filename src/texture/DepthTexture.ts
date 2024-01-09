import GLTexture from "./GLTexture.js";

export default class DepthTexture extends GLTexture {
    generate(data: undefined, width: number, height: number): void {
        const rc = this.getContext();
        rc.texImage2D_DEPTH24_UINT_NULL(width, height);
    }
}