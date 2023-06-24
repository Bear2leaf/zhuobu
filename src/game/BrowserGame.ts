
import BrowserDevice from "../device/BrowserDevice.js";
import AGame from "./AGame.js";

export default class BrowserGame extends AGame {
    constructor(el: HTMLElement) {
        super(new BrowserDevice(el.appendChild(document.createElement("canvas"))));
    }
}