import Sprite from "../drawobject/Sprite.js";


export default class RenderMap extends Sprite {
    init(): void {
        this.getRect().x = 0;
        this.getRect().y = 300;
        this.getRect().z = 300;
        this.getRect().w = 300;
        super.init();
    }
}