
import BrowserDevice from "../device/BrowserDevice.js";
import Game from "./Game.js";

export default class BeartalkGame extends Game {
    private readonly canvas: HTMLCanvasElement;
    constructor(private readonly el: HTMLElement) {
        super();
        this.canvas = document.createElement("canvas");
        this.canvas.width = 320;
        this.canvas.height = 568;
        this.setDevice(new BrowserDevice(this.canvas));
        this.addObjects();
    }
    appendToEl() {
        this.el.appendChild(this.canvas);
    }
}