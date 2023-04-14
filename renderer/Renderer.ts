import Camera from "../Camera.js";
import { device } from "../Device.js";
import DrawObject from "../drawobject/DrawObject.js";
import Shader from "../Shader.js";


export default class Renderer {
    private readonly shader: Shader;
    constructor(shader: Shader) {
        this.shader = shader;
    }
    render(camera: Camera, drawObject: DrawObject) {
        this.shader.use();
        this.shader.setMatrix4fv("u_world", drawObject.worldMatrix.getVertics())
        this.shader.setMatrix4fv("u_view", camera.view.getVertics())
        this.shader.setMatrix4fv("u_projection", camera.projection.getVertics())
        device.gl.bindVertexArray(drawObject.vao);
    }
}