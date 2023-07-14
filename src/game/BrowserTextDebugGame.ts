
import BrowserDevice from "../device/BrowserDevice.js";
import SceneManager from "../manager/SceneManager.js";
import TextDebugScene from "../scene/TextDebugScene.js";
import Game from "./Game.js";

export default class BrowserTextDebugGame extends Game {
    constructor(el: HTMLElement) {
        super();
        const canvas = document.createElement("canvas");
        canvas.width = 320;
        canvas.height = 568;
        this.setDevice(new BrowserDevice(el.appendChild(canvas)));
        this.addObjects();
        this.load().then(() => {
            this.get(SceneManager).add(TextDebugScene);
            this.get(SceneManager).addObjects();
            this.init();
            this.update();
        });
    }
}