import BrowserGame from "../game/BrowserGame.js";

// base web component
export default class GameZhuobuWebComponent extends HTMLElement {
    constructor() {
        super()
        const canvas = this.appendChild(document.createElement("canvas"))
        new BrowserGame(canvas);
        
    }
}