
import BrowserDevice from "../device/BrowserDevice.js";
import SceneManager from "../manager/SceneManager.js";
import SpriteScene from "../scene/SpriteScene.js";
import Game from "./Game.js";

export default class BrowserSpriteGame extends Game {
    constructor(el: HTMLElement) {
        super();
        this.setDevice(new BrowserDevice(el.appendChild(document.createElement("canvas"))))
        this.addObjects();
        this.load().then(() => {
            this.get(SceneManager).add(SpriteScene);
            this.get(SceneManager).addObjects();
            this.init();
            this.update();
        });
    }
}