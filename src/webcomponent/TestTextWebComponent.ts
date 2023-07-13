import BrowserTextGame from "../game/BrowserTextGame.js";

// component without shadow dom, test drawobject factory
export default class TestTextWebComponent extends HTMLElement {
    constructor() {
        super();
        new BrowserTextGame(this);

    }
}
