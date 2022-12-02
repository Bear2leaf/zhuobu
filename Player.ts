import GameObject from "./GameObject.js";
import Renderer from "./Renderer.js";
export default class Player implements GameObject {
    private x: number;
    private y: number;
    private originX: number;
    private originY: number;
    destX: number;
    destY: number;
    private color: [number, number, number, number];
    private scale: number;
    constructor() {
        this.destX = this.x = 0;
        this.destY = this.y = 0;
        this.originX = 4;
        this.originY = 8;
        this.color = [1, 1, 1, 1];
        this.scale = 10;
    }
    update() {
        this.x = this.destX;
        this.y = this.destY;
    }
    draw(renderer: Renderer) {
        renderer.drawText(this.x - this.originX * this.scale, this.y - this.originY * this.scale, this.scale, this.color, 'player');
    }
}