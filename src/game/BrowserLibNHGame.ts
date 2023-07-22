
import BrowserDevice from "../device/BrowserDevice.js";
import Manager from "../manager/Manager.js";
import SceneManager from "../manager/SceneManager.js";
import WorkerManager from "../manager/WorkerManager.js";
import LibNHScene from "../scene/LibNHScene.js";
import Game from "./Game.js";

export default class BrowserLibNHGame extends Game {
    constructor(el: HTMLElement) {
        super();
        const canvas = document.createElement("canvas");
        canvas.width = 320;
        this.setDevice(new BrowserDevice(el.appendChild(canvas)));
        this.addObjects();
        this.load().then(() => {
            this.get(SceneManager).add(LibNHScene);
            this.get(SceneManager).addObjects();
            this.init();
            this.update();
        });
    }
    getOtherCtors(): (new () => Manager<unknown>)[] {
        return [
            WorkerManager
        ];
    }
}