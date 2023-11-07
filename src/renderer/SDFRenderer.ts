
import { PrimitiveType } from "../contextobject/Primitive.js";
import DrawObject from "../drawobject/DrawObject.js";
import { Vec4 } from "../geometry/Vector.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import { TextureIndex } from "../texture/Texture.js";
import Renderer from "./Renderer.js";

export default class SDFRenderer extends Renderer {
    render(): void {

        super.render();
        const buffer = 0.55;
        const scale = 128 / 2;
        const gamma = 2;
        this.getShader().setInteger("u_texture", TextureIndex.OffscreenCanvas);
        this.getShader().setVector4f("u_color", new Vec4(1, 1, 1, 1));
        this.getShader().setFloat("u_buffer", buffer);
        this.getEntity().get(DrawObject).draw(this.getPrimitive().getMode());
    
        this.getShader().setVector4f("u_color", new Vec4(0, 0, 0, 1));
        this.getShader().setFloat("u_buffer", 0.75);
        this.getShader().setFloat("u_gamma", gamma * 1.4142 / scale);
        this.getEntity().get(DrawObject).draw(this.getPrimitive().getMode());
    }
    initPrimitive(rc: RenderingContext): void {
        this.setPrimitive(rc.makePrimitive(PrimitiveType.TRIANGLES));
    }
}