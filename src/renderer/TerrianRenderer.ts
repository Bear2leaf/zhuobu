
import Renderer from "./Renderer.js";

export default class TerrianRenderer extends Renderer {
    render() {
        this.getShader().use();
        this.prepareLight();
        super.render();
    }
}