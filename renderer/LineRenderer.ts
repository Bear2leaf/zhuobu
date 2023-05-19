import Renderer from "./Renderer.js";
import { LineShader } from "../shader/LineShader.js";
import Camera from "../camera/Camera.js";
import DrawObject from "../drawobject/DrawObject.js";

export class LineRenderer extends Renderer {
    private readonly primitiveType: number
    constructor(gl: WebGL2RenderingContext, textCache: Map<string, string>) {
        super(new LineShader(gl, textCache))
        this.primitiveType = gl.LINES;

    }
    render(camera: Camera, drawObject: DrawObject): void {
        super.render(camera, drawObject);

        drawObject.draw(this.primitiveType);
    }
}