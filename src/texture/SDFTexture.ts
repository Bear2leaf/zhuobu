import DrawObject from "../drawobject/DrawObject.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import OffscreenCanvasTexture from "./OffscreenCanvasTexture.js";

export default class SDFTexture extends OffscreenCanvasTexture {
    init(): void {
        super.init();
        this.setCanvasContext(this.getDevice().getSDFCanvasRenderingContext());
        this.getSceneManager().first().getComponents(SDFCharacter).forEach(comp => {
            comp.getEntity().get(DrawObject).setTexture(this);
        });
    }

}