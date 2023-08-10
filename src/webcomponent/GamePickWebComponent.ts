import BrowserGame from "../game/BrowserGame.js";
import BrowserPickGame from "../game/BrowserPickGame.js";

// base web component
export default class GamePickWebComponent extends HTMLElement {
    constructor() {
        super()
        new BrowserPickGame(this);
        
    }
}