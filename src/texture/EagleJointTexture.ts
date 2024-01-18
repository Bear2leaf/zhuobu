
import GLTexture from "./GLTexture.js";

export default class EagleJointTexture extends GLTexture {
    generate(data: Float32Array, width: number, height: number): void {
        const rc = this.getContext();
        rc.texImage2D_RGBA32F_RGBA_FLOAT(width, height, data);
    }
}