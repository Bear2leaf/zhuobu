import BrowserGame from "../game/BrowserGame.js";

export default class MainGame extends HTMLElement {
    private readonly game: BrowserGame;
    private readonly elChildren: HTMLElement[] = []
    addChildren(el: HTMLElement) {
        this.elChildren.push(el);
    }
    connectedCallback() {
        this.game.appendToEl();
        this.elChildren.forEach(this.appendChild.bind(this))
    }

    constructor() {
        super();
        this.game = new BrowserGame(this);
    }

}
