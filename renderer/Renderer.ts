import Camera from "../Camera.js";
import { device } from "../Device.js";
import DrawObject from "../drawobject/DrawObject.js";
import Shader from "../Shader.js";


export default class Renderer {
    private readonly mode: number;
    private readonly shader: Shader;
    buffered: boolean;
    constructor(shader: Shader, mode: number) {
        this.mode = mode;
        this.shader = shader;
        this.buffered = false;
    }
    setTextureUnit() {
        this.shader.use();
        this.shader.setInteger("u_texture", 0);
    }
    render(camera: Camera, drawObject: DrawObject) {
        this.shader.use();
        this.shader.setMatrix4fv("u_world", drawObject.worldMatrix.getVertics())
        this.shader.setMatrix4fv("u_view", camera.view.getVertics())
        this.shader.setMatrix4fv("u_projection", camera.projection.getVertics())
        device.gl.bindVertexArray(drawObject.vao);
        drawObject.draw(this.mode);
    }
}