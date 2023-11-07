
import BrowserDevice from "../device/BrowserDevice.js";
import SceneManager from "../manager/SceneManager.js";
import DebugScene from "../scene/DebugScene.js";
import Game from "./Game.js";

export default class BrowserDebugGame extends Game {
    constructor(el: HTMLElement) {
        super();
        const canvas = document.createElement("canvas");
        canvas.width = 320;
        canvas.height = 568;
        const offscreenCanvas = document.createElement("canvas");
        el.appendChild(offscreenCanvas);
        offscreenCanvas.style.display = "none";
        const sdfCanvas = document.createElement("canvas");
        el.appendChild(sdfCanvas);
        sdfCanvas.style.display = "none";
        this.setDevice(new BrowserDevice(el.appendChild(canvas), offscreenCanvas, sdfCanvas));
        this.addObjects();
        this.load().then(() => {
            this.get(SceneManager).add(DebugScene);
            this.get(SceneManager).addObjects();
            this.init();
            this.update();
        });
    }
}