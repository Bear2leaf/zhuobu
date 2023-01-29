import { device } from "../Device.js";
import Renderer from "./Renderer.js";
import { PointShader } from "../Shader.js";
export class PointRenderer extends Renderer {
    constructor(camera) {
        super(new PointShader(), device.gl.POINTS, camera);
    }
}
//# sourceMappingURL=PointRenderer.js.map