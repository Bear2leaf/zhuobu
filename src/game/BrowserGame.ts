import BrowserDevice from "../device/BrowserDevice.js";
import BaseGame from "./BaseGame.js";

export default class BrowserGame extends BaseGame {
    constructor(canvas: HTMLCanvasElement) {
        super(new BrowserDevice(canvas))
    }
}