import Subject from "./Subject.js";

export default class AdrElementSubject extends Subject {
    private element?: unknown;
    getElement(): unknown {
        if (!this.element) throw new Error("element is not set!");
        return this.element;
    }
    setElement(element: unknown) {
        this.element = element;
    }
    public notify(): void {
        super.notify();
        this.element = undefined;
    }
}
