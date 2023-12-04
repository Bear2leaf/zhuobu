

import MiniGameDevice from "../device/MiniGameDevice.js";
import Game from "./Game.js";


export default class MiniGame extends Game {
    constructor() {
        super();
        const device = new MiniGameDevice();
        this.buildVars(device);
        this.buildDependency();
        this.load(device).then(() => {
            this.initManagers(device);
            this.update();
        });
    }
}
