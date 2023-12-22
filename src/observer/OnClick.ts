import Pointer from "../drawobject/Pointer.js";
import BaseClickSubject from "../subject/BaseClickSubject.js";
import ClickPickSubject from "../subject/ClickPick.js";
import Observer from "./Observer.js";

export default class OnClick extends Observer {
    private pointer?: Pointer;
    private next?: BaseClickSubject;
    getSubject(): BaseClickSubject {
        if (!(super.getSubject() instanceof BaseClickSubject)) {
            throw new Error("subject is not BaseClickSubject!");
        }
        return super.getSubject() as BaseClickSubject;
    }
    setPointer(pointer: Pointer) {
        this.pointer = pointer;
    }
    setChainNext(clickPick: ClickPickSubject) {
        this.next = clickPick;
    }
    public notify(): void {
        this.pointer?.onClick(this.getSubject().getX(), this.getSubject().getY());
        if (this.next) {
            this.next.setPosition(this.getSubject().getX(), this.getSubject().getY());
            this.next.setPixelRatio(this.getSubject().getPixelRatio());
            this.next.notify();
        }
    }
}
