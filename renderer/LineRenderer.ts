import Camera from "../Camera.js";
import { device } from "../Device.js";
import Renderer from "./Renderer.js";
import { LineShader } from "../Shader.js";
import DrawObject from "../drawobject/DrawObject.js";

export class LineRenderer extends Renderer {
    constructor(camera: Camera) {
        super(new LineShader(), device.gl.LINES, camera)
    }
}