

export default class Checkbox extends HTMLElement {
    private readonly input: HTMLInputElement;
    private readonly text: HTMLSpanElement;
    private readonly p: HTMLParagraphElement;

    constructor(title: string) {
        super();
        this.text = document.createElement("span");
        this.input = document.createElement("input");
        this.input.type = "checkbox";
        this.input.checked = false;
        this.text.innerText = title;
        this.p = document.createElement("p");
        this.p.appendChild(this.text);
        this.p.appendChild(this.input);
        this.appendChild(this.p);
        this.input.onchange = () => {
            if (this.input.checked) {
                this.onEnabled();
            } else {
                this.onDisabled();
            }
        }
    }
    onEnabled() {
        throw new Error("Method not implemented.");
    }

    onDisabled() {
        throw new Error("Method not implemented.");
    }


}