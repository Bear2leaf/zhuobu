


import BrowserDevice from "../device/BrowserDevice.js";
import SceneManager from "../manager/SceneManager.js";
import SkinMeshScene from "../scene/SkinMeshScene.js";
import Game from "./Game.js";

export default class BrowserSkinMeshGame extends Game {
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
            this.get(SceneManager).add(SkinMeshScene);
            this.get(SceneManager).addObjects();
            this.init();
            this.update();
        });
    }
}