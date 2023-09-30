
import BrowserDevice from "../device/BrowserDevice.js";
import SceneManager from "../manager/SceneManager.js";
import CameraControlScene from "../scene/CameraControlScene.js";
import Game from "./Game.js";

export default class BrowserCameraControllGame extends Game {
    constructor(el: HTMLElement) {
        super();
        const canvas = document.createElement("canvas");
        canvas.width = 645;
        canvas.height = 568;
        this.setDevice(new BrowserDevice(el.appendChild(canvas)));
        this.addObjects();
        this.load().then(() => {
            this.get(SceneManager).add(CameraControlScene);
            this.get(SceneManager).addObjects();
            this.init();
            this.update();
        });
    }
}