import WxDevice from "../device/WxDevice.js";
import Game from "./Game.js";

export default class WxGame extends Game {
    constructor() {
        super(new WxDevice())
    }
}