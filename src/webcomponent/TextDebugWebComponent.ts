import BrowserTextDebugGame from "../game/BrowserTextDebugGame.js";

// component without shadow dom, test drawobject factory
export default class TextDebugWebComponent extends HTMLElement {
    constructor() {
        super();
        new BrowserTextDebugGame(this);

    }
}
