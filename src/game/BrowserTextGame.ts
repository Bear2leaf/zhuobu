
import BrowserDevice from "../device/BrowserDevice.js";
import SceneManager from "../manager/SceneManager.js";
import TextScene from "../scene/TextScene.js";
import Game from "./Game.js";

export default class BrowserMeshGame extends Game {
    constructor(el: HTMLElement) {
        super();
        const canvas = document.createElement("canvas");
        canvas.width = 320;
        this.setDevice(new BrowserDevice(el.appendChild(canvas)));
        this.addObjects();
        this.load().then(() => {
            this.get(SceneManager).add(TextScene);
            this.get(SceneManager).addObjects();
            this.init();
            this.update();
        });
    }
}