import Camera from "../camera/Camera.js";
import Renderer from "./Renderer.js";
import { VertexColorTriangle } from "../shader/VertexColorTriangle.js";
import DrawObject from "../drawobject/DrawObject.js";
import Node from "../structure/Node.js";

export class TriangleRenderer extends Renderer {
    private readonly primitiveType: number;
    constructor(gl: WebGL2RenderingContext, textCache: Map<string, string>) {
        super(new VertexColorTriangle(gl, textCache))
        this.primitiveType = gl.TRIANGLES;
    }
    render(camera: Camera, node: Node): void {
        super.render(camera, node);
        node.getDrawObjects().forEach(drawObject => {
            drawObject.draw(this.primitiveType);
        });
    }
}