
import BrowserDevice from "../device/BrowserDevice.js";
import Game from "./Game.js";

export default class BeartalkGame extends Game {
    private readonly canvas: HTMLCanvasElement;
    private readonly offscreenCanvas: HTMLCanvasElement;
    constructor(private readonly el: HTMLElement) {
        super();
        this.canvas = document.createElement("canvas");
        this.canvas.width = 320;
        this.canvas.height = 568;
        this.offscreenCanvas = document.createElement("canvas");
        this.offscreenCanvas.style.display = "none";
        this.setDevice(new BrowserDevice(this.canvas, this.offscreenCanvas));
        this.addObjects();
    }
    appendToEl() {
        this.el.appendChild(this.canvas);
        this.el.appendChild(this.offscreenCanvas);
    }
}