
import DepthMap from "../texturemap/DepthMap.js";
import PickMap from "../texturemap/PickMap.js";
import { PrimitiveType } from "../contextobject/Primitive.js";
import DrawObject from "../drawobject/DrawObject.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import { TextureIndex } from "../texture/Texture.js";
import Renderer from "./Renderer.js";
import SingleColorCanvasMap from "../texturemap/SingleColorCanvasMap.js";

export default class SpriteRenderer extends Renderer {
    render(): void {

        super.render();
        if (this.getEntity().has(DepthMap)) {
            this.getShader().setInteger("u_texture", TextureIndex.Depth);
            this.getShader().setInteger("u_textureType", TextureIndex.Depth);
        } else if (this.getEntity().has(PickMap)) {
            this.getShader().setInteger("u_texture", TextureIndex.Pick);
            this.getShader().setInteger("u_textureType", TextureIndex.Pick);
        } else if (this.getEntity().has(SingleColorCanvasMap)) {
            this.getShader().setInteger("u_texture", TextureIndex.OffscreenCanvas);
            this.getShader().setInteger("u_textureType", TextureIndex.Default);
        } else {
            this.getShader().setInteger("u_texture", TextureIndex.Default);
            this.getShader().setInteger("u_textureType", TextureIndex.Default);
        }
        this.getEntity().get(DrawObject).draw(this.getPrimitive().getMode());
    }
    initPrimitive(rc: RenderingContext): void {
        this.setPrimitive(rc.makePrimitive(PrimitiveType.TRIANGLES));
    }
}