import GameObject from "./GameObject";
import Renderer from "./Renderer";
export default class Player implements GameObject {
    private x: number;
    private y: number;
    destX: number;
    destY: number;
    private color: [number, number, number, number];
    private scale: number;
    constructor() {
        this.destX = this.x = 0;
        this.destY = this.y = 0;
        this.color = [1, 1, 1, 1];
        this.scale = 2;
    }
    update() {
        this.x = this.destX;
        this.y = this.destY;
    }
    draw(renderer: Renderer) {
        renderer.drawText(this.x, this.y, this.scale, this.color, 'player');
    }
}