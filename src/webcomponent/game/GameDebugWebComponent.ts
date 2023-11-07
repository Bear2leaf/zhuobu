import BrowserDebugGame from "../../game/BrowserDebugGame.js";

// component without shadow dom, test drawobject factory
export default class GameDebugWebComponent extends HTMLElement {
    constructor() {
        super();
        new BrowserDebugGame(this);

    }
}
