import Sprite from "../drawobject/Sprite.js";


export default class DefaultSprite extends Sprite {
    initContextObjects(): void {
        this.getRect().z = 20;
        this.getRect().w = 20;
        super.initContextObjects();
    }
}