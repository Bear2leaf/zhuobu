import { Vec3 } from "../geometry/Vector.js";
import { UniformBinding } from "../renderingcontext/RenderingContext.js";
import Renderer from "./Renderer.js";

export default class GLTFSkinMeshRenderer extends Renderer {
    render(clear: boolean = true) {
        this.getShader().use();
        this.prepareLight();
        this.prepareMaterial();
        super.render(clear);
    }
    prepareMaterial(): void {
        this.updateUBO(UniformBinding.Material, new Vec3(.5, .8, 1).toFloatArray());
    }
}
