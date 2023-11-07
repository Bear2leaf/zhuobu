
export default class NumberRange extends HTMLElement {
    onNumberUpdate() {
        this.innerHTML = `<p><br /><input type="range" min="0" max="500"></p>`;
    }
    setNumber(value: number) {
        const input = this.querySelector("input");
        if (!input) {
            return;
        }
        input.value = value.toString();
    }
}