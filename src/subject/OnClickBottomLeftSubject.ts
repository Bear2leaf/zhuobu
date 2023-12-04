import BaseTouchSubject from "./BaseTouchSubject.js";

export default class OnClickBottomLeftSubject extends BaseTouchSubject {
    
    update(): void {
        if (this.getTouch().getIsTouchingStart() && this.getTouch().getX() < 100 && this.getTouch().getY() < 100) {
            this.notify();
        }
    }
 }
