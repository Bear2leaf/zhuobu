import Camera from "../Camera.js";
import { device } from "../Device.js";
import Renderer from "./Renderer.js";
import { TriangleShader } from "../Shader.js";
import DrawObject from "../drawobject/DrawObject.js";

export class TriangleRenderer extends Renderer {
    constructor() {
        super(new TriangleShader())
    }
    render(camera: Camera, drawObject: DrawObject): void {
        super.render(camera, drawObject);

        drawObject.draw(device.gl.TRIANGLES);
    }
}