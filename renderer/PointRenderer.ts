import Renderer from "./Renderer.js"
import Camera from "../camera/Camera.js";
import Node from "../structure/Node.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import Primitive, { PrimitiveType } from "../contextobject/Primitive.js";

export class PointRenderer extends Renderer {
    private readonly primitive: Primitive
    constructor(gl: RenderingContext) {
        super(gl.makeShader("Point"))
        this.primitive = gl.makePrimitive(PrimitiveType.POINTS);
    }
    render(camera: Camera, node: Node): void {
        super.render(camera, node);
        node.getDrawObjects().forEach(drawObject => {
            drawObject.draw(this.primitive.getMode());
        });
    }
}