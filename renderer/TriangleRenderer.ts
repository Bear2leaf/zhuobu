import Camera from "../camera/Camera.js";
import { device } from "../device/Device.js";
import Renderer from "./Renderer.js";
import { VertexColorTriangle } from "../shader/VertexColorTriangle.js";
import DrawObject from "../drawobject/DrawObject.js";

export class TriangleRenderer extends Renderer {
    constructor() {
        super(new VertexColorTriangle())
    }
    render(camera: Camera, drawObject: DrawObject): void {
        super.render(camera, drawObject);

        drawObject.draw(device.gl.TRIANGLES);
    }
}