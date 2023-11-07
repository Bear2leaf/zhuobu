
export default class Text extends HTMLElement {
    private text?: string | undefined;
    onTextUpdate() {
        this.innerHTML = "<p><br />" + (this.text || "") + "</p>";
    }
    setText(text: string) {
        this.text = text;
    }
}