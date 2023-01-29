import { PerspectiveCamera } from "../Camera.js";
import { device } from "../Device.js";
import Matrix from "../Matrix.js";
import Renderer from "./Renderer.js";
import { TriangleShader } from "../Shader.js";
import { Vec4 } from "../Vector.js";
import Gasket from "../drawobject/Gasket.js";

export class TriangleRenderer extends Renderer {
    constructor() {
        super(new TriangleShader(), device.gl.TRIANGLES, new PerspectiveCamera())
        const ctm = Matrix.identity()
            .translate(new Vec4(0, 0, -8, 0))
        this.updateTransform(ctm);
        this.drawObjects.push(new Gasket())
    }
    render(): void {

        super.render()
    }
}