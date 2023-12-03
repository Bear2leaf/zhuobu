import TouchEvent from "../event/TouchEvent.js";
import DemoSubject from "./DemoSubject.js";

export default class OnClickBottomLeftSubject extends DemoSubject {

    update(): void {
        const touchEvent = this.getEntity().get(TouchEvent);
        if (touchEvent.getIsTouchingStart() && touchEvent.getX() < 100 && touchEvent.getY() < 100) {
            this.notify();
        }
    }
 }
