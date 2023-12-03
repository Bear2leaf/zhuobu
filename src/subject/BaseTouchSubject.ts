import TouchEvent from "../event/TouchEvent.js";
import Subject from "./Subject.js";

export default class BaseTouchSubject extends Subject {
    update(): void {
        const touchEvent = this.getEntity().get(TouchEvent);
        if (touchEvent.getIsTouchingStart()) {
            this.notify();
        }
    }
}
