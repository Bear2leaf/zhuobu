import { UniformBinding } from "../renderingcontext/RenderingContext.js";
import Water from "../sprite/Water.js";
import Renderer from "./Renderer.js";

export default class WaterRenderer extends Renderer {
    private frames = 0;
    render(clear: boolean = true): void {
        this.getShader().use();
        this.bindUBOs();
        const camera = this.getCamera();
        const projection = camera.getProjection().getVertics();
        const viewInverse = camera.getView().inverse().getVertics();
        this.updateUBO(UniformBinding.Camera, new Float32Array([...viewInverse, ...projection, ...camera.getEye().toFloatArray()]));
        const objectList = this.getObjectList();
        objectList.forEach(drawObject => {
            if (!(drawObject instanceof Water)) {
                throw new Error("drawObject is not water")
            }
            drawObject.bind();
            drawObject.getReflectTexture().bind();
            drawObject.getDistortionTexture().bind();
            drawObject.getNormalTexture().bind();
            this.getShader().setFloat("u_frames", (this.frames++ / 1000) % 1.0);
            this.getShader().setInteger("u_refractTexture", drawObject.getTexture().getBindIndex());
            this.getShader().setInteger("u_reflectTexture", drawObject.getReflectTexture().getBindIndex());
            this.getShader().setInteger("u_normalTexture", drawObject.getNormalTexture().getBindIndex());
            this.getShader().setInteger("u_distortionTexture", drawObject.getDistortionTexture().getBindIndex());
            drawObject.draw();
        });
        if (clear) {
            objectList.splice(0, objectList.length);
        }
    }
}