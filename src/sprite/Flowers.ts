import Sprite from "../drawobject/Sprite.js";


export default class Flowers extends Sprite {
    init(): void {
        this.getRect().z = 512;
        this.getRect().w = 512;
        super.init();
    }
}