
import { Vec3 } from "../geometry/Vector.js";
import { UniformBinding } from "../renderingcontext/RenderingContext.js";
import Renderer from "./Renderer.js";

export default class GLTFMeshRenderer extends Renderer {
    render(clear: boolean = true) {
        this.getShader().use();
        this.prepareLight();
        super.render(clear);

    }
    prepareLight() {
        this.updateUBO(UniformBinding.Light, new Vec3(0, 0, 1).toFloatArray());
        this.updateUBO(UniformBinding.Material, new Vec3(1, 1, 1).toFloatArray());
    }
}