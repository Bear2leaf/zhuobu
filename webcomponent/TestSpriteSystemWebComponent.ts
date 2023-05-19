import BrowserSpriteGame from "../game/BrowserSpriteGame.js";

// component without shadow dom, test drawobject factory
export default class TestSpriteSystemWebComponent extends HTMLElement {
    constructor() {
        super();
        const canvas = this.appendChild(document.createElement("canvas"))
        new BrowserSpriteGame(canvas);

    }
}
