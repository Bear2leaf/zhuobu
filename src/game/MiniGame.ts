

import MiniGameDevice from "../device/MiniGameDevice.js";
import FrameBufferManager from "../manager/FrameBufferManager.js";
import SceneManager from "../manager/SceneManager.js";
import DemoScene from "../scene/DemoScene.js";
import PickScene from "../scene/PickScene.js";
import Game from "./Game.js";


export default class MiniGame extends Game {
    constructor() {
        super();
        this.setDevice(new MiniGameDevice());
        this.addObjects();
        this.load().then(() => {
            this.get(FrameBufferManager).setPickOnly(true);
            this.get(SceneManager).add(DemoScene);
            this.get(SceneManager).add(PickScene);
            this.get(SceneManager).addObjects();
            this.init();
            this.update();
        });
    }
}
