
import BrowserDevice from "../device/BrowserDevice.js";
import SceneManager from "../manager/SceneManager.js";
import GLTFScene from "../scene/GLTFScene.js";
import Game from "./Game.js";

export default class BrowserTestGLTFGame extends Game {
    constructor(el: HTMLElement) {
        super();
        const canvas = document.createElement("canvas");
        canvas.width = 600;
        canvas.height = 800;
        this.setDevice(new BrowserDevice(el.appendChild(canvas)));
        this.addObjects();
        this.load().then(() => {
            this.get(SceneManager).add(GLTFScene);
            this.get(SceneManager).addObjects();
            this.init();
            this.update();
        });
    }
}