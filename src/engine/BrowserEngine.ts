
import BrowserDevice from "../device/BrowserDevice.js";
import Engine from "./Engine.js";

export default class BrowserEngine extends Engine {
    private readonly canvas: HTMLCanvasElement;
    private readonly offscreenCanvas: HTMLCanvasElement;
    private readonly sdfCanvas: HTMLCanvasElement;
    constructor(private readonly el: HTMLElement) {
        super();
        this.canvas = document.createElement("canvas");
        this.offscreenCanvas = document.createElement("canvas");
        this.sdfCanvas = document.createElement("canvas");
        this.offscreenCanvas.style.display = "none";
        this.sdfCanvas.style.display = "none";
        const device = new BrowserDevice(this.canvas, this.offscreenCanvas, this.sdfCanvas);
        this.canvas.width = 480 * device.getWindowInfo().pixelRatio;
        this.canvas.height = 960 * device.getWindowInfo().pixelRatio;
        this.canvas.style.height = "100%";
        this.buildDependency();
        this.buildVars(device);
        this.load(device).then(() => {
            this.initManagers();
            this.update();
        });
        this.appendToEl();
    }
    appendToEl() {
        this.el.appendChild(this.canvas);
        this.el.appendChild(this.offscreenCanvas);
        this.el.appendChild(this.sdfCanvas);
    }
}