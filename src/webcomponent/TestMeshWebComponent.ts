import BrowserMeshGame from "../game/BrowserMeshGame.js";

// component without shadow dom, test drawobject factory
export default class TestMeshWebComponent extends HTMLElement {
    constructor() {
        super();
        const canvas = this.appendChild(document.createElement("canvas"))
        new BrowserMeshGame(canvas);

    }
}
