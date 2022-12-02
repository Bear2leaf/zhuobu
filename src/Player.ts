import GameObject from "./GameObject";
import Renderer from "./Renderer";
export default class Player implements GameObject {
    x: number;
    y: number;
    color: [number, number, number, number];
    scale: number;
    constructor() {
        this.x = 0;
        this.y = 0;
        this.color = [1, 1, 1, 1];
        this.scale = 2;
    }
    update() {
        this.x++;
        this.y++;
    }
    draw(renderer: Renderer) {
        renderer.drawText(this.x, this.y, this.scale, this.color, 'player');
    }
}