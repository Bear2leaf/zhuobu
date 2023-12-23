
import { UniformBinding } from "../renderingcontext/RenderingContext.js";
import { TextureBindIndex } from "../texture/Texture.js";
import Renderer from "./Renderer.js";

export default class SDFRenderer extends Renderer {
    private scale: number = 32;
    private buffer: number = 0.5;
    private outlineBuffer: number = 0.75;
    private gamma: number = 2;
    setScale(scale: number) {
        this.scale = scale;
    }
    render(clear: boolean = true) {
        this.getShader().use();
        this.bindUBOs();
        const camera = this.getCamera();
        const projection = camera.getProjection().getVertics();
        const view = camera.getView().getVertics();
        this.getShader().setInteger("u_texture", TextureBindIndex.OffscreenCanvas);
        this.updateUBO(UniformBinding.Camera, new Float32Array([...view, ...projection]));
        this.updateUBO(UniformBinding.SDF, new Float32Array([this.buffer, this.outlineBuffer, this.gamma * 1.4142 / this.scale, 0]));
        
        this.getObjectList().forEach(drawObject => {
            drawObject.bind();
            this.getShader().setBool("u_inner", 0);
            drawObject.draw();
            this.getShader().setBool("u_inner", 1);
            drawObject.draw();

        });
        if (clear) {
            this.getObjectList().splice(0, this.getObjectList().length);
        }
    }

}