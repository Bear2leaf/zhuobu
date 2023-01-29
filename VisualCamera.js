import { OrthoCamera } from "./Camera.js";
import { device } from "./Device.js";
import Renderer from "./renderer/Renderer.js";
import { LineShader } from "./Shader.js";
import { Vec4 } from "./Vector.js";
export default class VisualCamera extends Renderer {
    constructor(renderer) {
        renderer.getCamera().projection.rotateY(Math.PI / 8);
        super(new LineShader(), device.gl.LINE_LOOP, new OrthoCamera());
        this.visualCamera = renderer.getCamera();
        this.renderer = renderer;
        this.frame = 0;
    }
    render() {
        const positions = [
            new Vec4(-1, -1, -1, 1),
            new Vec4(1, -1, -1, 1),
            new Vec4(-1, 1, -1, 1),
            new Vec4(1, 1, -1, 1),
            new Vec4(-1, -1, 1, 1),
            new Vec4(1, -1, 1, 1),
            new Vec4(-1, 1, 1, 1),
            new Vec4(1, 1, 1, 1),
        ];
        const indices = [
            0, 1, 1, 3, 3, 2, 2, 0,
            4, 5, 5, 7, 7, 6, 6, 4,
            0, 4, 1, 5, 3, 7, 2, 6,
        ];
        this.setVertices(positions);
        this.setIndices(indices);
        this.renderer.render();
        super.render();
    }
}
//# sourceMappingURL=VisualCamera.js.map