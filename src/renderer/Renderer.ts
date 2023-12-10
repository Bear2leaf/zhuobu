import Camera from "../camera/Camera.js";
import Shader from "../shader/Shader.js";
import CacheManager from "../manager/CacheManager.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import SceneManager from "../manager/SceneManager.js";
import DrawObject from "../drawobject/DrawObject.js";
import Node from "../transform/Node.js";
import { Vec3 } from "../geometry/Vector.js";


export default class Renderer {
    private camera?: Camera;
    private shader?: Shader;
    private shaderName?: string;
    private readonly pickColor = new Vec3(0, 0, 0);
    getPickColor() {
        return this.pickColor;
    }

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
    }
    prepareShader() {
        this.getShader().use();
    }
    prepareCamera() {
        const camera = this.getCamera();
        this.getShader().setMatrix4fv("u_view", camera.getView().getVertics())
        this.getShader().setMatrix4fv("u_projection", camera.getProjection().getVertics())
    }
    preparePickColor() {
        this.getShader().setVector3u("u_pickColor", this.pickColor);
    }
    drawEntity(drawObject: DrawObject) {
        this.preparePickColor();
        this.getShader().setMatrix4fv("u_world", drawObject.getEntity().get(Node).getWorldMatrix().getVertics());
        drawObject.bind();
        drawObject.draw();
        this.pickColor.set(0, 0, 0);
    }
    render(drawObject: DrawObject) {
        throw new Error("not implemented");
    }
}