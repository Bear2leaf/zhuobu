
import { Vec3 } from "../geometry/Vector.js";
import { UniformBinding } from "../renderingcontext/RenderingContext.js";
import Renderer from "./Renderer.js";

export default class GLTFMeshRenderer extends Renderer {
    render(clear: boolean = true) {
        this.getShader().use();
        this.prepareLight();
        this.prepareMaterial();
        super.render(clear);
    }
    prepareMaterial(): void {
        this.updateUBO(UniformBinding.Material, new Vec3(1, 1, 1).toFloatArray());
    }
}