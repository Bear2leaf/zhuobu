
import BrowserDevice from "../device/BrowserDevice.js";
import Game from "./Game.js";

export default class BrowserGame extends Game {
    constructor(el: HTMLElement) {
        super();
        this.setDevice(new BrowserDevice(el.appendChild(document.createElement("canvas"))))
        this.addObjects();
        this.load().then(() => {
            this.init();
            this.update();
        });
    }
}