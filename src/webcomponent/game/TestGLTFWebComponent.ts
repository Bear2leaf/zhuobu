import BrowserTestGLTFGame from "../../game/BrowserTestGLTFGame.js";

// component without shadow dom, test drawobject factory
export default class TestGLTFWebComponent extends HTMLElement {
    constructor() {
        super();
        new BrowserTestGLTFGame(this);

    }
}
