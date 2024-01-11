

import MiniGameDevice from "../device/MiniGameDevice.js";
import Engine from "./Engine.js";


export default class MiniGameEngine extends Engine {
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
