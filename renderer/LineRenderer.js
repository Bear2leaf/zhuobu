import { PerspectiveCamera } from "../Camera.js";
import { device } from "../Device.js";
import Renderer from "./Renderer.js";
import { LineShader } from "../Shader.js";
export class LineRenderer extends Renderer {
    constructor() {
        super(new LineShader(), device.gl.TRIANGLES, new PerspectiveCamera());
    }
}
//# sourceMappingURL=LineRenderer.js.map