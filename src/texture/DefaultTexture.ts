import RenderingContext from "../renderingcontext/RenderingContext.js";
import BaseTexture from "./BaseTexture.js";

export default class DefaultTexture extends BaseTexture {
    create(gl: RenderingContext): void {
        super.create(gl);
        this.generate(2, 2, new Float32Array([1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1]));
    }
    
}