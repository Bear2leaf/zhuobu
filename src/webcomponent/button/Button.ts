

export default class Button extends HTMLElement {
    private readonly button: HTMLButtonElement;
    private readonly p: HTMLParagraphElement;
    constructor() {
        super();
        this.button = document.createElement("button");
        this.p = document.createElement("p");
        this.p.appendChild(this.button);
        this.appendChild(this.p);
        this.button.onclick = () => {
            this.onClick();
        }
    }
    setText(text: string) {
        this.button.innerText = text;
    }

    onClick() {
        throw new Error("Method not implemented.");
    }

}