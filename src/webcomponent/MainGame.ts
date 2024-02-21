import BrowserDevice from "../device/BrowserDevice.js";
import Engine from "../engine/Engine.js";

export default class MainGame extends HTMLElement {
    connectedCallback() {
        const engine = new Engine(new BrowserDevice());
    }


}
