import Touch from "../input/Touch.js";
import BaseTouchSubject from "../subject/BaseTouchSubject.js";
import Observer from "./Observer.js";

export default class OnClick extends Observer {
    private handler?: (touch: Touch) => void;
    getSubject(): BaseTouchSubject {
        if (!(super.getSubject() instanceof BaseTouchSubject)) {
            throw new Error("subject is not BaseTouchSubject!");
        }
        return super.getSubject() as BaseTouchSubject;
    }
    public notify(): void {
        if (!this.handler) throw new Error("handler not set");
        this.handler(this.getSubject().getTouch());
    }
    setHandler(handler: (touch: Touch) => void) {
        this.handler = handler;
    }
}
