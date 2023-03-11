import { device } from "../Device.js";
import Renderer from "./Renderer.js";
import { LineShader } from "../Shader.js";
import Camera from "../Camera.js";
import DrawObject from "../drawobject/DrawObject.js";

export class LineRenderer extends Renderer {
    constructor() {
        super(new LineShader())
    }
    render(camera: Camera, drawObject: DrawObject): void {
        super.render(camera, drawObject);

        drawObject.draw(device.gl.LINES);
    }
}