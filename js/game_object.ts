import SpriteRenderer from "./sprite_renderer.js";
import Texture2D from "./texture.js";

export default class GameObject {
    readonly position: Vec3;
    readonly size: Vec3;
    readonly velocity: Vec2;
    readonly color: Vec3;
    readonly rotation: number;
    isSolid: boolean;
    destroyed: boolean;

    readonly sprite: Texture2D;

    constructor(pos: Vec2 = [0, 0], size: Vec2 = [1, 1], sprite: Texture2D = new Texture2D(), color: Vec3 = [1, 1, 1], velocity: Vec2 = [0, 0]) {
        this.position = [...pos, 0];
        this.size = [...size, 0];
        this.velocity = velocity;
        this.color = color;
        this.rotation = 0;
        this.isSolid = false;
        this.destroyed = false;
        this.sprite = sprite;
    }
    draw(renderer: SpriteRenderer) {
        renderer.drawSprite(this.sprite, this.position, this.size, this.rotation, this.color);
    }
}