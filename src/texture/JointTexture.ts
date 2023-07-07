import GLTexture from "./GLTexture.js";
import { TextureIndex } from "./Texture.js";

export default class JointTexture extends GLTexture {
    create(gl: WebGL2RenderingContext, bindIndex: number = TextureIndex.Joint, wrapS?: number, wrapT?: number, filterMin?: number, filterMax?: number): void {
        super.create(gl, bindIndex, wrapS, wrapT, filterMin, filterMax);
    }
    
}