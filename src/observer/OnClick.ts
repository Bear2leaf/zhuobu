import BaseClickSubject from "../subject/BaseClickSubject.js";
import Observer from "./Observer.js";

export default class OnClick extends Observer {
    private handler?: (x: number, y: number) => void;
    getSubject(): BaseClickSubject {
        if (!(super.getSubject() instanceof BaseClickSubject)) {
            throw new Error("subject is not BaseClickSubject!");
        }
        return super.getSubject() as BaseClickSubject;
    }
    public notify(): void {
        if (!this.handler) throw new Error("handler not set");
        this.handler(this.getSubject().getX(), this.getSubject().getY());
    }
    setHandler(handler: (x: number, y: number) => void) {
        this.handler = handler;
    }
}
