import Camera from "../camera/Camera.js";
import Shader from "../shader/Shader.js";
import CacheManager from "../manager/CacheManager.js";
import RenderingContext, { UniformBinding } from "../renderingcontext/RenderingContext.js";
import SceneManager from "../manager/SceneManager.js";
import DrawObject from "../drawobject/DrawObject.js";
import UniformBufferObject from "../contextobject/UniformBufferObject.js";
import SkinMesh from "../drawobject/SkinMesh.js";
import Matrix from "../geometry/Matrix.js";
import { Vec3, Vec4 } from "../geometry/Vector.js";
import TerrianMesh from "../drawobject/TerrianMesh.js";
import EagleMesh from "../drawobject/EagleMesh.js";


export default class Renderer {
    private readonly uboMap: Map<UniformBinding, UniformBufferObject> = new Map();
    private readonly objectlist: DrawObject[] = [];
    private readonly lightPosition = new Vec3(0.5, 0.5, -0.5);
    private readonly lightTarget = new Vec3(0, 0, 0);
    private readonly lightUp = new Vec3(0, 1.0, 0);
    private readonly lightProjection = Matrix.ortho(-1, 1, -1, 1, -10.0, 10.0).getVertics();
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
        this.uboMap.set(UniformBinding.Camera, rc.makeUniformBlockObject());
        this.uboMap.set(UniformBinding.Model, rc.makeUniformBlockObject());
        this.uboMap.set(UniformBinding.Pick, rc.makeUniformBlockObject());
        this.uboMap.set(UniformBinding.SDF, rc.makeUniformBlockObject());
        this.uboMap.set(UniformBinding.Light, rc.makeUniformBlockObject());
        this.uboMap.set(UniformBinding.Material, rc.makeUniformBlockObject());
        this.uboMap.set(UniformBinding.Shadow, rc.makeUniformBlockObject());
        this.updateUBO(UniformBinding.Camera, new Float32Array([...Matrix.identity().getVertics(), ...Matrix.identity().getVertics()]));
        this.updateUBO(UniformBinding.Model, Matrix.identity().getVertics());
        this.updateUBO(UniformBinding.Pick, new Vec4().toFloatArray());
        this.updateUBO(UniformBinding.SDF, new Vec4().toFloatArray());
        this.updateUBO(UniformBinding.Light, new Vec4().toFloatArray());
        this.updateUBO(UniformBinding.Material, new Vec4().toFloatArray());
        this.updateUBO(UniformBinding.Shadow, new Float32Array([...Matrix.identity().getVertics(), ...Matrix.identity().getVertics()]));
    }

    bindUBOs() {
        if (!this.getObjectList().length) {
            // only bind ubos for valid objects
            return;
        }
        this.uboMap.forEach((ubo, index) => {
            this.getShader().bindUniform(index);
            ubo.bind(index);
        });
    }
    updateUBO(index: UniformBinding, data: Float32Array) {
        const ubo = this.uboMap.get(index);
        if (!ubo) {
            throw new Error("ubo not exist");
        }
        ubo.updateBuffer(data);
    }
    addObject(drawObject: DrawObject) {
        this.objectlist.push(drawObject);
    }
    getObjectList() {
        return this.objectlist;
    }
    prepareLight() {
        this.updateUBO(UniformBinding.Light, this.lightPosition.normalize().toFloatArray());
    }
    render() {
        this.getShader().use();
        this.bindUBOs();
        const camera = this.getCamera();
        const projection = camera.getProjection().getVertics();
        const viewInverse = camera.getView().inverse().getVertics();
        const lightView = Matrix.lookAt(this.lightPosition.clone().normalize(), this.lightTarget.clone().normalize(), this.lightUp.clone().normalize());
        const lightViewInverse = lightView.inverse().getVertics();
        this.updateUBO(UniformBinding.Camera, new Float32Array([...viewInverse, ...projection]));
        this.updateUBO(UniformBinding.Shadow, new Float32Array([...lightViewInverse, ...this.lightProjection]));
        this.objectlist.forEach(drawObject => {
            drawObject.bind();
            drawObject.getTexture().active();
            drawObject.getTexture().bind()
            if (drawObject instanceof EagleMesh) {
                drawObject.getJointTexture().active();
                drawObject.getJointTexture().bind();
                this.getShader().setInteger("u_jointTexture", drawObject.getJointTexture().getBindIndex());
            } else if (drawObject instanceof SkinMesh) {
                drawObject.getJointTexture().active();
                drawObject.getJointTexture().bind();
                this.getShader().setInteger("u_jointTexture", drawObject.getJointTexture().getBindIndex());
            } else if (drawObject instanceof TerrianMesh) {
                drawObject.getDepthTexture().active();
                drawObject.getDepthTexture().bind();
                this.getShader().setInteger("u_depthTexture", drawObject.getDepthTexture().getBindIndex());
            }
            this.getShader().setInteger("u_texture", drawObject.getTexture().getBindIndex());
            drawObject.draw();
        });
        this.objectlist.splice(0, this.objectlist.length);
    }
    renderShadow() {
        this.getShader().use();
        this.bindUBOs();
        const lightView = Matrix.lookAt(this.lightPosition.clone().normalize(), this.lightTarget.clone().normalize(), this.lightUp.clone().normalize());
        const lightViewInverse = lightView.inverse().getVertics();
        this.updateUBO(UniformBinding.Camera, new Float32Array([...lightViewInverse, ...this.lightProjection]));
        this.objectlist.forEach(drawObject => {
            drawObject.bind();
            drawObject.getTexture().active();
            drawObject.getTexture().bind();
            if (drawObject instanceof SkinMesh) {
                drawObject.getJointTexture().active();
                drawObject.getJointTexture().bind();
                this.getShader().setInteger("u_jointTexture", drawObject.getJointTexture().getBindIndex());
            }
            this.getShader().setInteger("u_texture", drawObject.getTexture().getBindIndex());
            drawObject.draw();
        });
        this.objectlist.splice(0, this.objectlist.length);
    }
}