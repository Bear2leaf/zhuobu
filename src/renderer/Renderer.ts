import Camera from "../camera/Camera.js";
import Component from "../entity/Component.js";
import Node from "../transform/Node.js";
import Shader from "../shader/Shader.js";
import CacheManager from "../manager/CacheManager.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import Primitive from "../contextobject/Primitive.js";
import OnClickPickSubject from "../subject/OnClickPickSubject.js";
import { Vec3 } from "../geometry/Vector.js";


export default class Renderer extends Component {
    private camera?: Camera;
    private shader?: Shader;
    private shaderName?: string;
    private primitive?: Primitive;

    setPrimitive(primitive: Primitive) {
        this.primitive = primitive;
    }
    getPrimitive() {
        if (!this.primitive) {
            throw new Error("primitive not exist");
        }
        return this.primitive;
    }

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
    setShaderName(name: string) {
        this.shaderName = name;
    }
    async loadShaderTxtCache(cacheManager: CacheManager) {
        if (!this.shaderName) {
            throw new Error("shader name not exist");
        }
        await cacheManager.loadShaderTxtCache(this.shaderName);
    }
    initShader(rc: RenderingContext, cacheManager: CacheManager) {
        if (!this.shaderName) {
            throw new Error("shader name not exist");
        }
        const vs = cacheManager.getVertShaderTxt(this.shaderName);
        const fs = cacheManager.getFragShaderTxt(this.shaderName);
        this.shader = rc.makeShader(vs, fs);
    }
    initPrimitive(rc: RenderingContext): void {
        throw new Error("Method not implemented.");
    }

    render() {
        const node = this.getEntity().get(Node);
        node.getRoot().updateWorldMatrix();
        const camera = this.getCamera();
        this.getShader().use();
        this.getShader().setMatrix4fv("u_world", node.getWorldMatrix().getVertics())
        this.getShader().setMatrix4fv("u_view", camera.getView().getVertics())
        this.getShader().setMatrix4fv("u_projection", camera.getProjection().getVertics())
        if (this.getEntity().has(OnClickPickSubject) && this.getEntity().get(OnClickPickSubject).getIsActive()) {
            this.getShader().setVector3u("u_pickColor", this.getEntity().get(OnClickPickSubject).getColor());
        } else {
            this.getShader().setVector3u("u_pickColor", new Vec3());
        }
    }
}