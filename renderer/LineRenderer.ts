import { OrthoCamera, PerspectiveCamera } from "../Camera.js";
import { device } from "../Device.js";
import { PointCollection, Tetrahedron, Point } from "../Geometry.js";
import Matrix from "../Matrix.js";
import Renderer from "./Renderer.js";
import { LineShader } from "../Shader.js";
import DrawObject from "../drawobject/DrawObject.js";

export class LineRenderer extends Renderer {
    constructor() {
        super(new LineShader(), device.gl.LINES, new OrthoCamera())
        this.updateTransform(Matrix.identity())
    }
    add(drawObject: DrawObject) {
        this.drawObjects.push(drawObject);
    }
}