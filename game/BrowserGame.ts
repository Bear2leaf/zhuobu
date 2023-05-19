import BrowserDevice from "../device/BrowserDevice.js";
import Game from "./Game.js";

export default class BrowserGame extends Game {
    constructor(canvas: HTMLCanvasElement) {
        super(new BrowserDevice(canvas))
    }
}