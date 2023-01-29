import { OrthoCamera } from "../Camera.js";
import { device } from "../Device.js";
import Matrix from "../Matrix.js";
import Renderer from "./Renderer.js";
import { LineShader } from "../Shader.js";
export class LineRenderer extends Renderer {
    constructor() {
        super(new LineShader(), device.gl.LINES, new OrthoCamera());
        this.updateTransform(Matrix.identity());
    }
    add(drawObject) {
        this.drawObjects.push(drawObject);
    }
}
//# sourceMappingURL=LineRenderer.js.map