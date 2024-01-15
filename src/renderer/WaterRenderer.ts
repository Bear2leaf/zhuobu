import { MainCamera } from "../camera/MainCamera.js";
import { UniformBinding } from "../renderingcontext/RenderingContext.js";
import Water from "../sprite/Water.js";
import Renderer from "./Renderer.js";

export default class WaterRenderer extends Renderer {
    private frames = 0;
    getCamera(): MainCamera {
        const camera = super.getCamera();
        if (!(camera instanceof MainCamera)) {
            throw new Error("camera is not MainCamera");
        }
        return camera;
    }
    render(): void {
        this.getShader().use();
        this.bindUBOs();
        const camera = this.getCamera();
        const projection = camera.getProjection().getVertics();
        const viewInverse = camera.getView().inverse().getVertics();
        this.updateUBO(UniformBinding.Camera, new Float32Array([...viewInverse, ...projection, ...camera.getEye().toFloatArray()]));
        this.getShader().setFloat("u_frames", (this.frames++ / 1000) % 1.0);
        this.getShader().setFloat("u_near", camera.getNear());
        this.getShader().setFloat("u_far", camera.getFar());
        const objectList = this.getObjectList();
        objectList.forEach(drawObject => {
            if (!(drawObject instanceof Water)) {
                throw new Error("drawObject is not water")
            }
            drawObject.bind();
            drawObject.getTexture().active();
            drawObject.getTexture().bind()
            this.getShader().setInteger("u_refractTexture", drawObject.getTexture().getBindIndex());
            drawObject.getDepthTexture().active();
            drawObject.getDepthTexture().bind();
            this.getShader().setInteger("u_depthTexture", drawObject.getDepthTexture().getBindIndex());
            drawObject.getReflectTexture().active();
            drawObject.getReflectTexture().bind();
            this.getShader().setInteger("u_reflectTexture", drawObject.getReflectTexture().getBindIndex());
            drawObject.getNormalTexture().active();
            drawObject.getNormalTexture().bind();
            this.getShader().setInteger("u_normalTexture", drawObject.getNormalTexture().getBindIndex());
            drawObject.getDistortionTexture().active();
            drawObject.getDistortionTexture().bind();
            this.getShader().setInteger("u_distortionTexture", drawObject.getDistortionTexture().getBindIndex());
            drawObject.draw();
        });
        objectList.splice(0, objectList.length);
    }
}