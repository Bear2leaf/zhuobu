import BrowserSkinMeshGame from "../../game/BrowserSkinMeshGame.js";

// component without shadow dom, test drawobject factory
export default class TestSkinMeshWebComponent extends HTMLElement {
    constructor() {
        super();
        new BrowserSkinMeshGame(this);

    }
}
