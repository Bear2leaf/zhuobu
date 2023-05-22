import BrowserSkinMeshGame from "../game/BrowserSkinMeshGame.js";

// component without shadow dom, test drawobject factory
export default class TestSkinMeshWebComponent extends HTMLElement {
    constructor() {
        super();
        const canvas = this.appendChild(document.createElement("canvas"))
        new BrowserSkinMeshGame(canvas);

    }
}
