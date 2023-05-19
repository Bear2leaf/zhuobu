import BrowserTestGame from "../game/BrowserTestGame.js";

// component without shadow dom, test drawobject factory
export default class TestFactoryWebComponent extends HTMLElement {
    constructor() {
        super();
        const canvas = this.appendChild(document.createElement("canvas"))
        new BrowserTestGame(canvas);

    }
}
