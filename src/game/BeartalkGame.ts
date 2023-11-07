
import BrowserDevice from "../device/BrowserDevice.js";
import Game from "./Game.js";

export default class BeartalkGame extends Game {
    private readonly canvas: HTMLCanvasElement;
    private readonly offscreenCanvas: HTMLCanvasElement;
    private readonly sdfCanvas: HTMLCanvasElement;
    constructor(private readonly el: HTMLElement) {
        super();
        this.canvas = document.createElement("canvas");
        this.canvas.width = 320;
        this.canvas.height = 568;
        this.offscreenCanvas = document.createElement("canvas");
        this.sdfCanvas = document.createElement("canvas");
        this.setDevice(new BrowserDevice(this.canvas, this.offscreenCanvas, this.sdfCanvas));
        this.addObjects();
    }
    appendToEl() {
        this.el.appendChild(this.canvas);
        this.el.appendChild(this.offscreenCanvas);
        this.el.appendChild(this.sdfCanvas);
    }
}