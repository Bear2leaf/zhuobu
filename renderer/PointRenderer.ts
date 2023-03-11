import { device } from "../Device.js"
import Renderer from "./Renderer.js"
import { PointShader } from "../Shader.js"
import Camera from "../Camera.js";
import DrawObject from "../drawobject/DrawObject.js";

export class PointRenderer extends Renderer {
    constructor() {
        super(new PointShader())
    }
    render(camera: Camera, drawObject: DrawObject): void {
        super.render(camera, drawObject);

        drawObject.draw(device.gl.POINTS);
    }
}