import RenderingContext from "../contextobject/RenderingContext.js";
import BaseTexture from "./BaseTexture.js";

export default class DefaultTexture extends BaseTexture {
    create(rc: RenderingContext): void {
        super.create(rc);
        this.generate(2, 2, new Float32Array([1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1]));
    }
    
}