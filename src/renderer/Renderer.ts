import Camera from "../camera/Camera.js";
import Component from "../component/Component.js";
import Node from "../component/Node.js";
import Shader from "../shader/Shader.js";
import CacheManager from "../manager/CacheManager.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import Primitive from "../contextobject/Primitive.js";


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
    initShader(gl: RenderingContext, cacheManager: CacheManager) {
        if (!this.shaderName) {
            throw new Error("shader name not exist");
        }
        const vs = cacheManager.getVertShaderTxt(this.shaderName);
        const fs = cacheManager.getFragShaderTxt(this.shaderName);
        this.shader = gl.makeShader(vs, fs);
    }
    initPrimitive(gl: RenderingContext): void {
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
        this.getShader().setInteger("u_texture", 0);
    }
}