import GLTexture from "./GLTexture.js";

export default class TerrainDiffuseTexture extends GLTexture {
    generate(data: undefined, width: number, height: number): void {
        const rc = this.getContext();
        rc.texImage2D_RGBA_RGBA_NULL(width, height);
    }
}