

import MiniGameDevice from "../device/MiniGameDevice.js";
import Game from "./Game.js";


export default class MiniGame extends Game {
    constructor() {
        super();
        const device = new MiniGameDevice();
        this.buildDependency();
        this.buildVars(device);
        this.load(device).then(() => {
            this.initManagers();
            this.update();
        });
    }
}
