import Camera from "../camera/Camera.js";
import device from "../device/Device.js";
import Renderer from "./Renderer.js";
import { VertexColorTriangle } from "../shader/VertexColorTriangle.js";
import DrawObject from "../drawobject/DrawObject.js";

export class TriangleRenderer extends Renderer {
    private readonly primitiveType: number;
    constructor(gl: WebGL2RenderingContext, textCache: Map<string, string>) {
        super(new VertexColorTriangle(gl, textCache))
        this.primitiveType = gl.TRIANGLES;
    }
    render(camera: Camera, drawObject: DrawObject): void {
        super.render(camera, drawObject);

        drawObject.draw(this.primitiveType);
    }
}