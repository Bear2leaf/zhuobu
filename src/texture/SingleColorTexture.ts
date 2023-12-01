import TextureContainer from "../container/TextureContainer.js";
import SingleColorCanvasMap from "../texturemap/SingleColorCanvasMap.js";
import OffscreenCanvasTexture from "./OffscreenCanvasTexture.js";

export default class SingleColorTexture extends OffscreenCanvasTexture {
    init(): void {
        super.init();
        this.setCanvasContext(this.getDevice().getOffscreenCanvasRenderingContext());
        this.getSceneManager().all().forEach(scene => {
            scene.getComponents(SingleColorCanvasMap).forEach(comp => {
                comp.getEntity().get(TextureContainer).setTexture(this);
            });
        });
    }
}