
import BrowserDevice from "../device/BrowserDevice.js";
import SceneManager from "../manager/SceneManager.js";
import TestGLTFScene from "../scene/TestGLTFScene.js";
import Game from "./Game.js";

export default class BrowserTestGLTFGame extends Game {
    constructor(el: HTMLElement) {
        super();
        const canvas = document.createElement("canvas");
        canvas.width = 320;
        this.setDevice(new BrowserDevice(el.appendChild(canvas)));
        this.addObjects();
        this.load().then(() => {
            this.get(SceneManager).add(TestGLTFScene);
            this.get(SceneManager).addObjects();
            this.init();
            this.update();
        });
    }
}