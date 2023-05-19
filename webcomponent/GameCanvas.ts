import BrowserDevice from "../device/BrowserDevice.js";
import Game from "../game.js";

// base web component
export default class GameCanvas extends HTMLCanvasElement {
    private readonly device: BrowserDevice;
    constructor() {
        super()
        this.id = "canvas";
        this.device = new BrowserDevice("canvas");
        const game = new Game(this.device);

        game.preload().then(() => game.load()).then(() => game.tick(0));
    }
}