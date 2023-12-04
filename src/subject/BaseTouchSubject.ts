import Touch from "../input/Touch.js";
import Subject from "./Subject.js";

export default abstract class BaseTouchSubject extends Subject {
    private touch?: Touch;
    getTouch() {
        if (!this.touch) throw new Error("Touch not set");
        return this.touch;
    }
    setTouch(touch: Touch) {
        this.touch = touch;
    }
    update(): void {
        if (this.getTouch().getIsTouchingStart()) {
            this.notify();
        }
    }
}
