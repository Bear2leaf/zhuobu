


import BrowserDevice from "../device/BrowserDevice.js";
import SceneManager from "../manager/SceneManager.js";
import SkinMeshScene from "../scene/SkinMeshScene.js";
import Game from "./Game.js";

export default class BrowserSkinMeshGame extends Game {
    constructor(el: HTMLElement) {
        super();
        this.setDevice(new BrowserDevice(el.appendChild(document.createElement("canvas"))))
        this.addObjects();
        this.load().then(() => {
            this.get(SceneManager).add(SkinMeshScene);
            this.get(SceneManager).addObjects();
            this.init();
            this.update();
        });
    }
}