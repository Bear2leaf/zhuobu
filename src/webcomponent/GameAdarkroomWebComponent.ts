import BrowserAdarkroomGame from "../game/BrowserAdarkroomGame.js";

// base web component
export default class GameAdarkroomWebComponent extends HTMLElement {
    constructor() {
        super()
        new BrowserAdarkroomGame(this);
        
    }
}