import Camera, { OrthoCamera, PerspectiveCamera } from "./Camera.js";
import { device } from "./Device.js";
import Matrix from "./Matrix.js";
import Renderer from "./Renderer.js";
import { LineShader } from "./Shader.js";
import { Vec3, Vec4 } from "./Vector.js";

export default class RendererDecorator extends Renderer {
    private readonly renderer: Renderer;
    private frame: number;
    constructor(renderer: Renderer) {
        super(new LineShader(), device.gl.LINE_LOOP, new PerspectiveCamera())
        this.renderer = renderer;
        this.frame = 0;
    }
    render(): void {
        const ctm = Matrix.identity();
        ctm.translate(new Vec4(0, 0, -10, 1)).rotateY(Math.PI * 2 * (this.frame++ / 360))
        this.updateTransform(ctm);
        const positions = [
            new Vec4(-1, -1,  -1, 1),  // cube vertices
            new Vec4( 1, -1,  -1, 1),
            new Vec4(-1,  1,  -1, 1),
            new Vec4( 1,  1,  -1, 1),
            new Vec4(-1, -1,  1, 1),
            new Vec4( 1, -1,  1, 1),
            new Vec4(-1,  1,  1, 1),
            new Vec4( 1,  1,  1, 1),
          ];
          const indices = [
            0, 1, 1, 3, 3, 2, 2, 0, // cube indices
            4, 5, 5, 7, 7, 6, 6, 4,
            0, 4, 1, 5, 3, 7, 2, 6,
          ];
        this.setVertices(positions)
        this.setIndices(indices)

        super.render();
    }
}