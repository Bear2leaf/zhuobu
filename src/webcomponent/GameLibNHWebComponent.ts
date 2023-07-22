import BrowserLibNHGame from "../game/BrowserLibNHGame.js";

// component without shadow dom, test drawobject factory
export default class GameLibNHWebComponent extends HTMLElement {
    constructor() {
        super();
        new BrowserLibNHGame(this);

    }
}
