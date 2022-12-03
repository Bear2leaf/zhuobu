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
        this.originX = 0;
        this.originY = 0;
        this.color = [1, 1, 1, 1];
        this.scale = 9;
    }
    update() {
        this.x = this.destX;
        this.y = this.destY;
    }
    draw(renderer: Renderer) {
        renderer.drawText(this.x - this.originX * this.scale, this.y - this.originY * this.scale, this.scale, this.scale, this.color,
            ...'!"#$%&\'()*+,-./\n0123456789\n:;<=>?@\nABCDEFGHIJKLM\nNOPQRSTUVWXYZ\n[\\]^_`{|}~\nabcdefghijklmn\nopqrstuvwxyz');
    }
}