import Camera from "../camera/Camera.js";
import Primitive from "../contextobject/Primitive.js";
import { Vec3, Vec4 } from "../math/Vector.js";
import Shader from "../shader/Shader.js";
import Node from "../component/Node.js";
import Component from "../component/Component.js";


export default abstract class Renderer implements Component {
    private shader?: Shader;
    private primitive?: Primitive;
    setShader(shader: Shader) {
        this.shader = shader;
    }
    setPrimitive(primitive: Primitive) {
        this.primitive = primitive;
    }
    render(camera: Camera, node: Node) {
        if (!this.shader) {
            throw new Error("shader not exist");
        }
        this.shader.use();
        this.shader.setMatrix4fv("u_world", node.getWorldMatrix().getVertics())
        this.shader.setMatrix4fv("u_view", camera.getView().getVertics())
        this.shader.setMatrix4fv("u_projection", camera.getProjection().getVertics())
        this.shader.setInteger("u_texture", 0);
        node.getDrawObjects().forEach(drawObject => {
            if (!this.primitive) {
                throw new Error("primitive not exist");
            }
            drawObject.draw(this.primitive.getMode());
        });
    }
    setMatrix4fv(name: string, data: Float32Array) {
        if (!this.shader) {
            throw new Error("shader not exist");
        }
        this.shader.setMatrix4fv(name, data)
    }
    setVector4fv(name: string, data: Vec4) {
        if (!this.shader) {
            throw new Error("shader not exist");
        }
        this.shader.setVector4f(name, data)
    }
    setVector3fv(name: string, data: Vec3) {
        if (!this.shader) {
            throw new Error("shader not exist");
        }
        this.shader.setVector3f(name, data)
    }
    setInteger(name: string, data: number) {
        if (!this.shader) {
            throw new Error("shader not exist");
        }
        this.shader.setInteger(name, data)
    }
}