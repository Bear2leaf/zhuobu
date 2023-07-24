
import BrowserDevice from "../device/BrowserDevice.js";
import SceneManager from "../manager/SceneManager.js";
import SpriteInPespectiveScene from "../scene/SpriteInPespectiveScene.js";
import Game from "./Game.js";

export default class BrowserSpriteInPerspectiveGame extends Game {
    constructor(el: HTMLElement) {
        super();
        const canvas = document.createElement("canvas");
        canvas.width = 645;
        this.setDevice(new BrowserDevice(el.appendChild(canvas)));
        this.addObjects();
        this.load().then(() => {
            this.get(SceneManager).add(SpriteInPespectiveScene);
            this.get(SceneManager).addObjects();
            this.init();
            this.update();
        });
    }
}