import AdrGame from "../game/AdrGame.js";

export default class MainGame extends HTMLElement {
    private readonly game: AdrGame;
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
        this.game = new AdrGame(this);
    }

}
