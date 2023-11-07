
import BrowserDevice from "../device/BrowserDevice.js";
import SceneManager from "../manager/SceneManager.js";
import TestGLTFScene from "../scene/TestGLTFScene.js";
import Game from "./Game.js";

export default class BrowserTestGLTFGame extends Game {
    constructor(el: HTMLElement) {
        super();
        const canvas = document.createElement("canvas");
        const offscreenCanvas = document.createElement("canvas");
        el.appendChild(offscreenCanvas);
        offscreenCanvas.style.display = "none";
        canvas.width = 320;
        const sdfCanvas = document.createElement("canvas");
        el.appendChild(sdfCanvas);
        sdfCanvas.style.display = "none";
        this.setDevice(new BrowserDevice(el.appendChild(canvas), offscreenCanvas, sdfCanvas));
        this.addObjects();
        this.load().then(() => {
            this.get(SceneManager).add(TestGLTFScene);
            this.get(SceneManager).addObjects();
            this.init();
            this.update();
        });
    }
}