import { PerspectiveCamera } from "../Camera.js";
import { device } from "../Device.js";
import { PointCollection, Tetrahedron, Point } from "../Geometry.js";
import Matrix from "../Matrix.js";
import Renderer from "./Renderer.js";
import { LineShader } from "../Shader.js";
import { Vec4 } from "../Vector.js";

export class LineRenderer extends Renderer {
    constructor() {
        super(new LineShader(), device.gl.TRIANGLES, new PerspectiveCamera())
    }
}