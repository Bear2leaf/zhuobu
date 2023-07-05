import GLTexture from "./GLTexture.js";
import { TextureIndex } from "./Texture.js";

export default class DefaultTexture extends GLTexture {
    create(gl: WebGL2RenderingContext, bindIndex: number = TextureIndex.Default, wrapS?: number, wrapT?: number, filterMin?: number, filterMax?: number): void {
        super.create(gl, bindIndex, wrapS, wrapT, filterMin, filterMax);
        this.generate(2, 2, new Float32Array([1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1]));
    }
    
}