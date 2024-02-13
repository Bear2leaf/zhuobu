
import Renderer from "./Renderer.js";

export default class TerrainDepthRenderer extends Renderer {
    render() {
        this.getShader().use();
        this.prepareLight();
        super.render();
    }
}