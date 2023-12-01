import TextureContainer from "../container/TextureContainer.js";
import GLTexture from "./GLTexture.js";

export default class DefaultTexture extends GLTexture {
    init(): void {
        super.init();
        this.generate(2, 2, new Float32Array([1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1]));
        this.getSceneManager().all().forEach(scene => scene.getComponents(TextureContainer).forEach(container => container.setTexture(this)));
    }

}