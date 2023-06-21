import Camera from "../camera/Camera.js";
import Renderer from "./Renderer.js";
import Node from "../structure/Node.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import Primitive, { PrimitiveType } from "../contextobject/Primitive.js";

export class TriangleRenderer extends Renderer {
    private readonly primitive: Primitive;
    constructor(gl: RenderingContext) {
        super(gl.makeShader("VertexColorTriangle"))
        this.primitive = gl.makePrimitive(PrimitiveType.TRIANGLES);
    }
    render(camera: Camera, node: Node): void {
        super.render(camera, node);
        node.getDrawObjects().forEach(drawObject => {
            drawObject.draw(this.primitive.getMode());
        });
    }
}