import Camera from "../camera/Camera.js";
import { Vec3, Vec4 } from "../math/Vector.js";
import Shader from "../shader/Shader.js";
import Node from "../structure/Node.js";


export default class Renderer {
    private readonly shader: Shader;
    constructor(shader: Shader) {
        this.shader = shader;
    }
    render(camera: Camera, node: Node) {
        this.shader.use();
        this.shader.setMatrix4fv("u_world", node.getWorldMatrix().getVertics())
        this.shader.setMatrix4fv("u_view", camera.getView().getVertics())
        this.shader.setMatrix4fv("u_projection", camera.getProjection().getVertics())
        this.shader.setInteger("u_texture", 0);
    }
    setMatrix4fv(name: string, data: Float32Array) {
        this.shader.setMatrix4fv(name, data)
    }
    setVector4fv(name: string, data: Vec4) {
        this.shader.setVector4f(name, data)
    }
    setVector3fv(name: string, data: Vec3) {
        this.shader.setVector3f(name, data)
    }
    setInteger(name: string, data: number) {
        this.shader.setInteger(name, data)
    }
}