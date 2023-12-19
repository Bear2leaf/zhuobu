import DrawObject from "../drawobject/DrawObject.js";
import Renderer from "./Renderer.js"
export class PointRenderer extends Renderer {
    render(drawObject: DrawObject): void {

        this.prepareShader();
        this.drawEntity(drawObject);

    }
}