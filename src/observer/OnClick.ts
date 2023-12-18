import BaseClickSubject from "../subject/BaseClickSubject.js";
import ClickPickSubject from "../subject/ClickPick.js";
import Observer from "./Observer.js";

export default class OnClick extends Observer {
    private handler?: (x: number, y: number) => void;
    private next?: BaseClickSubject;
    getSubject(): BaseClickSubject {
        if (!(super.getSubject() instanceof BaseClickSubject)) {
            throw new Error("subject is not BaseClickSubject!");
        }
        return super.getSubject() as BaseClickSubject;
    }
    setChainNext(clickPick: ClickPickSubject) {
        this.next = clickPick;
    }
    public notify(): void {
        if (!this.handler) throw new Error("handler not set");
        this.handler(this.getSubject().getX(), this.getSubject().getY());
        if (this.next) {
            this.next.setPosition(this.getSubject().getX(), this.getSubject().getY());
            this.next.notify();
        }
    }
    setHandler(handler: (x: number, y: number) => void) {
        this.handler = handler;
    }
}
