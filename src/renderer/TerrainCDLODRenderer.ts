
import TerrainCDLOD from "../drawobject/TerrainCDLOD.js";
import Renderer from "./Renderer.js";

export default class TerrainCDLODRenderer extends Renderer {
    render() {
        const renderer = this;
        this.prepareUBOs();
        this.prepareLight();
        const objects = this.getObjectList() as TerrainCDLOD[];
        objects.forEach(object => {
            const camera = this.getCamera();
            const eye = camera.getEye().toFloatArray().slice(0, 3);
            renderer.getShader().updateUniform("u_eye", eye);
            renderer.getShader().updateUniform("u_resolution", object.TILE_RESOLUTION);
            renderer.getShader().updateUniform("u_lightDirection", [1, 1, 0]);
            object.getTexture().active();
            object.getTexture().bind();
            renderer.getShader().updateUniform("u_texture", object.getTexture().getBindIndex());
            object.getDepthTexture().active();
            object.getDepthTexture().bind();
            renderer.getShader().updateUniform("u_texture7", object.getDepthTexture().getBindIndex());
            object.bind();
            object.drawInstanced(object.tiles)
        })
        objects.splice(0, objects.length);

    }
}