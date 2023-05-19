import Renderer from "./Renderer.js"
import { PointShader } from "../shader/PointShader.js";
import Camera from "../camera/Camera.js";
import DrawObject from "../drawobject/DrawObject.js";

export class PointRenderer extends Renderer {
    private readonly primitiveType: number
    constructor(gl: WebGL2RenderingContext, textCache: Map<string, string>) {
        super(new PointShader(gl, textCache))
        this.primitiveType = gl.POINTS;
    }
    render(camera: Camera, drawObject: DrawObject): void {
        super.render(camera, drawObject);

        drawObject.draw(this.primitiveType);
    }
}