import { device } from "../device/Device.js";
import Renderer from "./Renderer.js";
import { LineShader } from "../shader/LineShader.js";
import Camera from "../camera/Camera.js";
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