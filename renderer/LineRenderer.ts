import Renderer from "./Renderer.js";
import Camera from "../camera/Camera.js";
import Node from "../structure/Node.js";
import RenderingCtx from "../renderingcontext/RenderingCtx.js";
import Primitive, { PrimitiveType } from "../contextobject/Primitive.js";

export class LineRenderer extends Renderer {
    private readonly primitive: Primitive
    constructor(gl: RenderingCtx, textCache: Map<string, string>) {
        super(gl.makeShader("Line"))
        this.primitive = gl.makePrimitive(PrimitiveType.LINES);

    }
    render(camera: Camera, node: Node): void {
        super.render(camera, node);
        node.getDrawObjects().forEach(drawObject => {
            drawObject.draw(this.primitive.getMode());
        });
    }
}