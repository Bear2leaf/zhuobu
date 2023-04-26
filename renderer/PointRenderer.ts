import { device } from "../device/Device.js";
import Renderer from "./Renderer.js"
import { Point } from "../shader/Point.js";
import Camera from "../camera/Camera.js";
import DrawObject from "../drawobject/DrawObject.js";

export class PointRenderer extends Renderer {
    constructor() {
        super(new Point())
    }
    render(camera: Camera, drawObject: DrawObject): void {
        super.render(camera, drawObject);

        drawObject.draw(device.gl.POINTS);
    }
}