import Sprite from "../drawobject/Sprite.js";


export default class Flowers extends Sprite {
    initContextObjects(): void {
        this.getRect().x = 800 - 256;
        this.getRect().y = 600 - 256;
        this.getRect().z = 256;
        this.getRect().w = 256;
        super.initContextObjects();
    }
}