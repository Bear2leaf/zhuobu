import Text from "./Text.js";
export default class Player extends Text {
    private step: number = 0;
    private readonly spawnPosition = [20, 80];
    constructor() {
        super(20, 80, 1, [0, 1, 1, 1], 1, '@')
    }
    setSpawnPosition(x: number, y: number) {
        this.spawnPosition[0] = x;
        this.spawnPosition[1] = y;
    }
    update() {
        this.step++;
        this.color[0] = Math.sin(this.step / 100);
        this.x = this.spawnPosition[0] + Math.sin(this.step / 100) * 10;
        this.y = this.spawnPosition[1] - Math.cos(this.step / 100) * 10;
    }
}