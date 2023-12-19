import Camera from "../camera/Camera.js";
import Shader from "../shader/Shader.js";
import CacheManager from "../manager/CacheManager.js";
import RenderingContext, { UniformBlockIndex } from "../renderingcontext/RenderingContext.js";
import SceneManager from "../manager/SceneManager.js";
import DrawObject from "../drawobject/DrawObject.js";
import Node from "../transform/Node.js";
import UniformBufferObject from "../contextobject/UniformBufferObject.js";


export default class Renderer {
    private readonly uboMap: Map<UniformBlockIndex, UniformBufferObject> = new Map();
    private camera?: Camera;
    private shader?: Shader;
    private shaderName?: string;

    private sceneManager?: SceneManager;
    setSceneManager(scene: SceneManager) {
        this.sceneManager = scene;
    }

    getSceneManager(): SceneManager {
        if (!this.sceneManager) {
            throw new Error("scene is not set");
        }
        return this.sceneManager;
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
        this.uboMap.set(UniformBlockIndex.ViewProjection, rc.makeUniformBlockObject(UniformBlockIndex.ViewProjection));
        this.getShader().bindUniform(UniformBlockIndex.ViewProjection);

        const camera = this.getCamera();
        const projection = camera.getProjection().getVertics();
        const view = camera.getView().getVertics();
        this.updateUBO(UniformBlockIndex.ViewProjection, new Float32Array([...view, ...projection]));
    }
    bindUBOs() {
        this.uboMap.forEach(ubo => ubo.bind());
    }
    updateUBO(index: UniformBlockIndex, data: Float32Array) {
        const ubo = this.uboMap.get(index);
        if (!ubo) {
            throw new Error("ubo not exist");
        }
        ubo.updateBuffer(data);
    }
    prepareShader() {
        this.getShader().use();
    }
    drawEntity(drawObject: DrawObject) {
        this.getShader().setVector4f("u_pickColor", drawObject.getPickColor());
        this.getShader().setMatrix4fv("u_world", drawObject.getEntity().get(Node).getWorldMatrix().getVertics());
        this.bindUBOs();
        drawObject.bind();
        drawObject.draw();
    }
    render(drawObject: DrawObject) {
        throw new Error("not implemented");
    }
}