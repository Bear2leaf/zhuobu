
import BrowserDevice from "../device/BrowserDevice.js";
import Game from "./Game.js";

export default class BrowserGame extends Game {
    constructor(el: HTMLElement) {
        super();
        this.init(new BrowserDevice(el.appendChild(document.createElement("canvas"))))
    }
}