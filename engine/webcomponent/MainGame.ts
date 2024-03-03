import BrowserDevice from "../device/BrowserDevice.js";
import Engine from "../main.js";

export default class MainGame extends HTMLElement {
    connectedCallback() {
        const engine = new Engine(new BrowserDevice());
        engine.start();
    }


}
