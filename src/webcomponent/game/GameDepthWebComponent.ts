import BrowserDepthGame from "../../game/BrowserDepthGame.js";

// base web component
export default class GameDepthWebComponent extends HTMLElement {
    constructor() {
        super()
        new BrowserDepthGame(this);
        
    }
}