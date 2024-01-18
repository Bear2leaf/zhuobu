import Renderer from "./Renderer.js";

export default class GLTFSkinMeshRenderer extends Renderer {
    render() {
        this.getShader().use();
        this.prepareLight();
        super.render();
    }
}
