import BrowserGame from "../game/BrowserGame.js";

// base web component
export default class GamePickWebComponent extends HTMLElement {
    constructor() {
        super()
        new BrowserGame(this);
        
    }
}