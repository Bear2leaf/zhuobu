import Pointer from "../drawobject/Pointer.js";
import Renderer from "./Renderer.js"
export class PointRenderer extends Renderer {
    render(): void {

        this.prepareShader();
        this.prepareCamera();
        this.getSceneManager().first().getComponents(Pointer).forEach(drawObject => {
            this.drawEntity(drawObject);
        });
    }
}