import WxDevice from "../device/WxDevice.js";
import BaseGame from "./BaseGame.js";

export default class WxGame extends BaseGame {
    constructor() {
        super(new WxDevice())
    }
}