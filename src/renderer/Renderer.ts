import Camera from "../camera/Camera.js";
import { Vec3, Vec4 } from "../math/Vector.js";
import Component from "../component/Component.js";
import PrimitiveTypeContainer from "../component/PrimitiveTypeContainer.js";
import DrawObject from "../drawobject/DrawObject.js";
import Entity from "../entity/Entity.js";
import Node from "../component/Node.js";
import Shader from "../shader/Shader.js";


export default class Renderer implements Component {
    private camera?: Camera;
    private entity?: Entity;
    private shader?: Shader;
    setShader(shader: Shader) {
        this.shader = shader;
    }
    getShader() {
        if (!this.shader) {
            throw new Error("shader not exist");
        }
        return this.shader;
    }
    
    setCamera(camera: Camera) {
        this.camera = camera;
    }
    getCamera() {
        if (!this.camera) {
            throw new Error("camera not exist");
        }
        return this.camera;
    }
    setEntity(entity: Entity) {
        this.entity = entity;
    }
    getEntity() {
        if (!this.entity) {
            throw new Error("entity not exist");
        }
        return this.entity;
    }

    render() {
        const node = this.getEntity().get(Node);
        const camera = this.getCamera();
        this.getShader().use();
        this.getShader().setMatrix4fv("u_world", node.getWorldMatrix().getVertics())
        this.getShader().setMatrix4fv("u_view", camera.getView().getVertics())
        this.getShader().setMatrix4fv("u_projection", camera.getProjection().getVertics())
        this.getShader().setInteger("u_texture", 0);
        const primitiveType = node.getEntity().get(PrimitiveTypeContainer).getPrimitiveType();
        node.getEntity().get(DrawObject).draw(primitiveType);

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