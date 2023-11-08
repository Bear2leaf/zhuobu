
import { PrimitiveType } from "../contextobject/Primitive.js";
import DrawObject from "../drawobject/DrawObject.js";
import { Vec4 } from "../geometry/Vector.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import { TextureIndex } from "../texture/Texture.js";
import Renderer from "./Renderer.js";

export default class SDFRenderer extends Renderer {
    private scale: number = 64;
    private buffer: number = 0.55;
    private gamma: number = 2;
    setScale(scale: number) {
        this.scale = scale;
    }
    render(): void {

        super.render();
        this.getShader().setInteger("u_texture", TextureIndex.OffscreenCanvas);
        this.getShader().setVector4f("u_color", new Vec4(1, 1, 1, 1));
        this.getShader().setFloat("u_buffer", this.buffer);
        this.getEntity().get(DrawObject).draw(this.getPrimitive().getMode());
    
        this.getShader().setVector4f("u_color", new Vec4(0, 0, 0, 1));
        this.getShader().setFloat("u_buffer", 0.75);
        this.getShader().setFloat("u_gamma", this.gamma * 1.4142 / this.scale);
        this.getEntity().get(DrawObject).draw(this.getPrimitive().getMode());
    }
    initPrimitive(rc: RenderingContext): void {
        this.setPrimitive(rc.makePrimitive(PrimitiveType.TRIANGLES));
    }
}