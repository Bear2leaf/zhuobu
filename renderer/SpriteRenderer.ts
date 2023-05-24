import Camera from "../camera/Camera.js";
import Primitive, { PrimitiveType } from "../contextobject/Primitive.js";
import RenderingCtx from "../renderingcontext/RenderingCtx.js";
import Node from "../structure/Node.js";
import Renderer from "./Renderer.js";

export default class SpriteRenderer extends Renderer {
    private readonly primitive: Primitive
    private readonly gl: RenderingCtx
    constructor(gl: RenderingCtx, textCache: Map<string, string>) {
        super(gl.makeShader("Sprite"));
        this.primitive = gl.makePrimitive(PrimitiveType.TRIANGLES);
        this.gl = gl;
        this.gl.useBlendFuncOneAndOneMinusSrcAlpha();
    }
    render(camera: Camera, node: Node) {
        this.gl.switchBlend(true);
        this.gl.switchUnpackPremultiplyAlpha(true);
        super.render(camera, node);
        node.getDrawObjects().forEach(sprite => {
            sprite.draw(this.primitive.getMode())
        });
        this.gl.switchUnpackPremultiplyAlpha(false);
        this.gl.switchBlend(false);
    }
}