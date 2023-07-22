

import MiniGameDevice from "../device/MiniGameDevice.js";
import Manager from "../manager/Manager.js";
import SceneManager from "../manager/SceneManager.js";
import WorkerManager from "../manager/WorkerManager.js";
import LibNHScene from "../scene/LibNHScene.js";
import Game from "./Game.js";


export default class MiniGame extends Game {
    constructor() {
        super();
        this.setDevice(new MiniGameDevice());
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
