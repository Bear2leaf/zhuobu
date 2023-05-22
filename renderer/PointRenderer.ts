import Renderer from "./Renderer.js"
import { PointShader } from "../shader/PointShader.js";
import Camera from "../camera/Camera.js";
import DrawObject from "../drawobject/DrawObject.js";
import Node from "../structure/Node.js";

export class PointRenderer extends Renderer {
    private readonly primitiveType: number
    constructor(gl: WebGL2RenderingContext, textCache: Map<string, string>) {
        super(new PointShader(gl, textCache))
        this.primitiveType = gl.POINTS;
    }
    render(camera: Camera, node: Node): void {
        super.render(camera, node);
        node.getDrawObjects().forEach(drawObject => {
            drawObject.draw(this.primitiveType);
        });
    }
}