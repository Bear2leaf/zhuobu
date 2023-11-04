
import BrowserDevice from "../device/BrowserDevice.js";
import SceneManager from "../manager/SceneManager.js";
import DemoScene from "../scene/DemoScene.js";
import Game from "./Game.js";

export default class BrowserGame extends Game {
    constructor(el: HTMLElement) {
        super();
        const canvas = document.createElement("canvas");
        canvas.width = 320;
        canvas.height = 568;
        const offscreenCanvas = document.createElement("canvas");
        el.appendChild(offscreenCanvas);
        offscreenCanvas.style.display = "none";
        this.setDevice(new BrowserDevice(el.appendChild(canvas), offscreenCanvas));
        this.addObjects();
        this.load().then(() => {
            this.get(SceneManager).add(DemoScene);
            this.get(SceneManager).addObjects();
            this.init();
            this.update();
        });
    }
}