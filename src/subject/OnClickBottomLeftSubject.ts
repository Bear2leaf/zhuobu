import TouchEvent from "../event/TouchEvent.js";
import BaseTouchSubject from "./BaseTouchSubject.js";

export default class OnClickBottomLeftSubject extends BaseTouchSubject {

    update(): void {
        const touchEvent = this.getEntity().get(TouchEvent);
        if (touchEvent.getIsTouchingStart() && touchEvent.getX() < 100 && touchEvent.getY() < 100) {
            this.notify();
        }
    }
 }
