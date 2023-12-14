import AdrElement from "../adr/adapter/AdrElement.js";
import Subject from "./Subject.js";

export default class AdrElementSubject extends Subject {
    private element?: AdrElement;
    getElement(): AdrElement {
        if (!this.element) throw new Error("element is not set!");
        return this.element;
    }
    setElement(element: AdrElement) {
        this.element = element;
    }
    public notify(): void {
        super.notify();
        this.element = undefined;
    }
}
