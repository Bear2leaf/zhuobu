import DrawObject from "../drawobject/DrawObject.js";
import Renderer from "./Renderer.js";

export default class WireframeRenderer extends Renderer {
    render(drawObject: DrawObject) {
        this.prepareShader();
        this.drawEntity(drawObject);

    }
}