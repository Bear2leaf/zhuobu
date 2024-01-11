import BrowserEngine from "../engine/BrowserEngine.js";

export default class MainGame extends HTMLElement {
    private readonly game: BrowserEngine;
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
        this.game = new BrowserEngine(this);
    }

}
