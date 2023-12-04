import DrawObject from "../drawobject/DrawObject.js";
import GLTexture from "./GLTexture.js";

export default class DefaultTexture extends GLTexture {
    init(): void {
        super.init();
        this.generate(2, 2, new Float32Array([1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1]));
        this.getSceneManager().first().getComponents(DrawObject).forEach(container => container.setTexture(this));
    }

}