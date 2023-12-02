import HelloWireframe from "../drawobject/HelloWireframe.js";
import Renderer from "./Renderer.js";

export default class WireframeRenderer extends Renderer {
    render() {
        this.prepareShader();
        this.prepareCamera();
        this.prepareLight();
        this.getSceneManager().first().getComponents(HelloWireframe).forEach(drawObject => {
            this.drawEntity(drawObject);
        });
    }
    prepareLight() {
    }
}