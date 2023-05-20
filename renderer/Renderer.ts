import Camera from "../camera/Camera.js";
import DrawObject from "../drawobject/DrawObject.js";
import { Vec3, Vec4 } from "../math/Vector.js";
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
    setMatrix4fv(name: string, data: Vec4) {
        this.shader.setVector4f(name, data)
    }
    setMatrix3fv(name: string, data: Vec3) {
        this.shader.setVector3f(name, data)
    }
}