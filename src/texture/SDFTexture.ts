import TextureContainer from "../container/TextureContainer.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import OffscreenCanvasTexture from "./OffscreenCanvasTexture.js";

export default class SDFTexture extends OffscreenCanvasTexture {
    init(): void {
        super.init();
        this.setCanvasContext(this.getDevice().getSDFCanvasRenderingContext());
        this.getSceneManager().all().forEach(scene => {
            scene.getComponents(SDFCharacter).forEach(comp => {
                comp.getEntity().get(TextureContainer).setTexture(this);
            });
        });
    }
    
}