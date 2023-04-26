import Camera from "../camera/Camera.js";
import { device } from "../device/Device.js";
import DrawObject from "../drawobject/DrawObject.js";
import Shader from "../shader/Shader.js";


export default class Renderer {
    private readonly shader: Shader;
    constructor(shader: Shader) {
        this.shader = shader;
    }
    render(camera: Camera, drawObject: DrawObject) {
        this.shader.use();
        this.shader.setMatrix4fv("u_world", drawObject.getNode().getWorldMatrix().getVertics())
        this.shader.setMatrix4fv("u_view", camera.getView().getVertics())
        this.shader.setMatrix4fv("u_projection", camera.getProjection().getVertics())
        drawObject.bind();
    }
}