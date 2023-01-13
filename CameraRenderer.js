import { PerspectiveCamera } from "./Camera.js";
import { device } from "./Device.js";
import Matrix from "./Matrix.js";
import Renderer from "./Renderer.js";
import { LineShader } from "./Shader.js";
import { Vec4 } from "./Vector.js";
export default class CameraRenderer extends Renderer {
    constructor() {
        super(new LineShader(), device.gl.LINE_LOOP, new PerspectiveCamera());
    }
    render() {
        const left = -250;
        const right = -left;
        const top = -250;
        const bottom = -top;
        const ctm = Matrix.identity()
            .translate(new Vec4(0, 0, left * 2, 0))
            .rotateY(Math.PI / 360 * 45)
            .scale(new Vec4(0.1, 0.1, 0.1, 1))
            .multiply(Matrix.identity().translate(new Vec4(0, 0, left * 2, 0)).inverse());
        this.updateTransform(ctm);
        const vertices = [
            new Vec4(-left * 4, -left * 4, -left * 4, 1),
            new Vec4(-left * 4, left * 4, -left * 4, 1),
            new Vec4(left * 4, -left * 4, -left * 4, 1),
            new Vec4(-left * 4, left * 4, -left * 4, 1),
            new Vec4(left * 4, left * 4, -left * 4, 1),
            new Vec4(left * 4, -left * 4, -left * 4, 1),
            new Vec4(-left * 4, -left * 4, left * 4, 1),
            new Vec4(left * 4, -left * 4, left * 4, 1),
            new Vec4(-left * 4, left * 4, left * 4, 1),
            new Vec4(-left * 4, left * 4, left * 4, 1),
            new Vec4(left * 4, -left * 4, left * 4, 1),
            new Vec4(left * 4, left * 4, left * 4, 1),
            new Vec4(-left * 4, left * 4, -left * 4, 1),
            new Vec4(-left * 4, left * 4, left * 4, 1),
            new Vec4(left * 4, left * 4, -left * 4, 1),
            new Vec4(-left * 4, left * 4, left * 4, 1),
            new Vec4(left * 4, left * 4, left * 4, 1),
            new Vec4(left * 4, left * 4, -left * 4, 1),
            new Vec4(-left * 4, -left * 4, -left * 4, 1),
            new Vec4(left * 4, -left * 4, -left * 4, 1),
            new Vec4(-left * 4, -left * 4, left * 4, 1),
            new Vec4(-left * 4, -left * 4, left * 4, 1),
            new Vec4(left * 4, -left * 4, -left * 4, 1),
            new Vec4(left * 4, -left * 4, left * 4, 1),
            new Vec4(-left * 4, -left * 4, -left * 4, 1),
            new Vec4(-left * 4, -left * 4, left * 4, 1),
            new Vec4(-left * 4, left * 4, -left * 4, 1),
            new Vec4(-left * 4, -left * 4, left * 4, 1),
            new Vec4(-left * 4, left * 4, left * 4, 1),
            new Vec4(-left * 4, left * 4, -left * 4, 1),
            new Vec4(left * 4, -left * 4, -left * 4, 1),
            new Vec4(left * 4, left * 4, -left * 4, 1),
            new Vec4(left * 4, -left * 4, left * 4, 1),
            new Vec4(left * 4, -left * 4, left * 4, 1),
            new Vec4(left * 4, left * 4, -left * 4, 1),
            new Vec4(left * 4, left * 4, left * 4, 1)
        ];
        this.setVertices(vertices);
        super.render();
    }
}
//# sourceMappingURL=CameraRenderer.js.map