import BrowserSpriteInPerspectiveGame from "../game/BrowserSpriteInPerspectiveGame.js";

// component without shadow dom, test drawobject factory
export default class SpriteInPerspectiveWebComponent extends HTMLElement {
    constructor() {
        super();
        new BrowserSpriteInPerspectiveGame(this);

    }
}
