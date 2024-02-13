import GLTexture from "./GLTexture.js";

export default class TerrainHeightTexture extends GLTexture {
    generate(data: undefined, width: number, height: number): void {
        const rc = this.getContext();
        rc.texImage2D_DEPTH32_Float_NULL(width, height);
    }
}