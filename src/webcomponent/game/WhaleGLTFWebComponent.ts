import BrowserWhaleGLTFGame from "../../game/BrowserWhaleGLTFGame.js";

// component without shadow dom, test drawobject factory
export default class WhaleGLTFWebComponent extends HTMLElement {
    constructor() {
        super();
        new BrowserWhaleGLTFGame(this);

    }
}
