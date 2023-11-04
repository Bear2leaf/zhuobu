
import BrowserDevice from "../device/BrowserDevice.js";
import SceneManager from "../manager/SceneManager.js";
import GLTFScene from "../scene/GLTFScene.js";
import Game from "./Game.js";

export default class BrowserWhaleGLTFGame extends Game {
    constructor(el: HTMLElement) {
        super();
        const canvas = document.createElement("canvas");
        const offscreenCanvas = document.createElement("canvas");
        el.appendChild(offscreenCanvas);
        offscreenCanvas.style.display = "none";
        canvas.width = 320;
        this.setDevice(new BrowserDevice(el.appendChild(canvas), offscreenCanvas));
        this.addObjects();
        this.load().then(() => {
            this.get(SceneManager).add(GLTFScene);
            this.get(SceneManager).addObjects();
            this.init();
            this.update();
        });
    }
}