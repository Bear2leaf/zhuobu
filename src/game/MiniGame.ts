

import MiniGameDevice from "../device/MiniGameDevice.js";
import Game from "./Game.js";


export default class MiniGame extends Game {
    constructor() {
        super();
        this.setDevice(new MiniGameDevice());
        this.addObjects();
        this.load().then(() => {
            this.init();
            this.update();
        });
    }
}
