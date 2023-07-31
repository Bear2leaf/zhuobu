import Sprite3dRenderer from "../renderer/Sprite3dRenderer.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import SpriteObject from "./SpriteObject.js";

export default class Sprite3dObject extends SpriteObject {
    registerComponents(): void {
        super.registerComponents();
        this.set(SpriteRenderer, new Sprite3dRenderer());
        this.get(Sprite3dRenderer).setEntity(this);
    }
    update(): void {
        super.update();
    }
}

