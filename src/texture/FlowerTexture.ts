import DrawObject from "../drawobject/DrawObject.js";
import Flowers from "../sprite/Flowers.js";
import GLTexture from "./GLTexture.js";

export default class FlowerTexture extends GLTexture {
    init(): void {
        super.init();
        this.generate(2, 2, this.getCacheManager().getImage("flowers"));

        this.getSceneManager().all().forEach(scene => {
            scene.getComponents(Flowers).forEach(comp => {
                comp.getEntity().get(DrawObject).setTexture(this);
            });
        });
    }
    
}