// base web component
export default class Hello extends HTMLElement {
    constructor() {
        super()
        this.appendChild(document.createTextNode("Hello World!"))
    }
}