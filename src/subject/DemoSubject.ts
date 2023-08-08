import TouchEventContainer from "../component/TouchEventContainer.js";
import Subject from "./Subject.js";

export default class DemoSubject extends Subject {
    update(): void {
        const touchEvent = this.getEntity().get(TouchEventContainer);
        if (touchEvent.getIsTouchingStart()) {
            this.notify();
        }
    }
}
