
import BrowserDevice from "../device/BrowserDevice.js";
import SceneManager from "../manager/SceneManager.js";
import DemoScene from "../scene/DemoScene.js";
import Game from "./Game.js";

export default class BrowserAdarkroomGame extends Game {
    constructor(el: HTMLElement) {
        super();
        const canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 600;
        this.setDevice(new BrowserDevice(el.appendChild(canvas)));
        this.addObjects();
        this.load().then(() => {
            this.get(SceneManager).add(DemoScene);
            this.get(SceneManager).addObjects();
            this.init();
            this.update();
        });
    }
}