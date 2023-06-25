import Camera from "../camera/Camera.js";
import Primitive from "../contextobject/Primitive.js";
import { Vec3, Vec4 } from "../math/Vector.js";
import Shader from "../shader/Shader.js";
import Node from "../component/Node.js";


export default class Renderer {
    private readonly shader: Shader;
    private readonly primitive: Primitive
    constructor(shader: Shader, primitive: Primitive) {
        this.shader = shader;
        this.primitive = primitive;
    }
    render(camera: Camera, node: Node) {
        this.shader.use();
        this.shader.setMatrix4fv("u_world", node.getWorldMatrix().getVertics())
        this.shader.setMatrix4fv("u_view", camera.getView().getVertics())
        this.shader.setMatrix4fv("u_projection", camera.getProjection().getVertics())
        this.shader.setInteger("u_texture", 0);
        node.getDrawObjects().forEach(drawObject => {
            drawObject.draw(this.primitive.getMode());
        });
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