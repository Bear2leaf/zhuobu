
import Renderer from "./Renderer.js";

export default class GLTFMeshRenderer extends Renderer {
    render() {
        this.getShader().use();
        this.prepareLight();
        super.render();
    }
}