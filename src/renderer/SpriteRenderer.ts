
import DepthMap from "../component/DepthMap.js";
import { PrimitiveType } from "../contextobject/Primitive.js";
import DrawObject from "../drawobject/DrawObject.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import Renderer from "./Renderer.js";

export default class SpriteRenderer extends Renderer {
    render(): void {

        super.render();
        if (this.getEntity().has(DepthMap)) {
            this.getShader().setInteger("u_texture", 2);
            this.getShader().setInteger("u_textureType", 1);
        }
        this.getEntity().get(DrawObject).draw(this.getPrimitive().getMode());
    }
    initPrimitive(gl: RenderingContext): void {
        this.setPrimitive(gl.makePrimitive(PrimitiveType.TRIANGLES));
    }
}