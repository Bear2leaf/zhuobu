import Observer from "../observer/Observer.js";
import OnClick from "../observer/OnClick.js";
import InputSubject from "./InputSubject.js";

export default class Click extends InputSubject {

    private readonly observers: (OnClick)[] = [];
    public register(observer: Observer): void {
        if (observer instanceof OnClick) {
            this.observers.push(observer);
        } else {
            throw new Error("Not support observer");
        }
        super.register(observer);
    }
    public notify(): void {
        this.observers.forEach(observer => {
            if (observer instanceof OnClick) {
                observer.x = this.getX();
                observer.y = this.getY();
                observer.pixelRatio = this.getPixelRatio();
            } else {
                throw new Error("Not support observer");
            }
        })
        super.notify();
    }
}
