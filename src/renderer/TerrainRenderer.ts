
import Renderer from "./Renderer.js";

export default class TerrainRenderer extends Renderer {
    render() {
        this.getShader().use();
        this.prepareLight();
        super.render();
    }
}