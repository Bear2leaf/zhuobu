import Sprite from "../drawobject/Sprite.js";


export default class DefaultSprite extends Sprite {
    init(): void {
        this.getRect().z = 20;
        this.getRect().w = 20;
        super.init();
    }
}