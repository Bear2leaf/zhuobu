import Pointer from "../drawobject/Pointer.js";
import Renderer from "./Renderer.js"
export class PointRenderer extends Renderer {
    render(): void {

        this.prepareShader();
        this.prepareCamera();
        this.getSceneManager().first().getComponents(Pointer).forEach(drawObject => {
            const touch = drawObject.getTouchEventContainer();
            drawObject.getTRS().getPosition().set(touch.getX(), touch.getY(), 0);
            this.drawEntity(drawObject);
        });
    }
}