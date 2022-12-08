import GameObject from "./GameObject.js";

export default class Character implements GameObject {
    private step;
    x;
    y;
    private readonly spawnPosition;
    constructor() {
        this.step = 0;
        this.x = 0;
        this.y = 0;
        this.spawnPosition = [20, 80];
    }
    update() {
        this.step++;
        this.x = this.spawnPosition[0] + Math.sin(this.step / 100) * 10;
        this.y = this.spawnPosition[1] - Math.cos(this.step / 100) * 10;
    }
}