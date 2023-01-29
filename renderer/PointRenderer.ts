import Camera from "../Camera.js"
import { device } from "../Device.js"
import Renderer from "./Renderer.js"
import { PointShader } from "../Shader.js"

export class PointRenderer extends Renderer {
    constructor(camera: Camera) {
        super(new PointShader(), device.gl.POINTS, camera)
    }
}