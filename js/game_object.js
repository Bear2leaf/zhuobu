import Texture2D from "./texture.js";
export default class GameObject {
    constructor(pos = [0, 0], size = [1, 1], sprite = new Texture2D(), color = [1, 1, 1], velocity = [0, 0]) {
        this.position = [...pos, 0];
        this.size = [...size, 0];
        this.velocity = velocity;
        this.color = color;
        this.rotation = 0;
        this.isSolid = false;
        this.destroyed = false;
        this.sprite = sprite;
    }
    draw(renderer) {
        renderer.drawSprite(this.sprite, this.position, this.size, this.rotation, this.color);
    }
}
//# sourceMappingURL=game_object.js.map