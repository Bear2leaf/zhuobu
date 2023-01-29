import { PerspectiveCamera } from "../Camera.js";
import { device } from "../Device.js";
import Renderer from "./Renderer.js";
import { TriangleShader } from "../Shader.js";
export class TriangleRenderer extends Renderer {
    constructor(camera = new PerspectiveCamera()) {
        super(new TriangleShader(), device.gl.TRIANGLES, camera);
    }
}
//# sourceMappingURL=TriangleRenderer.js.map