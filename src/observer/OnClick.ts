import Pointer from "../drawobject/Pointer.js";
import InputSubject from "../subject/InputSubject.js";
import Observer from "./Observer.js";

export default class OnClick extends Observer {
    private pointer?: Pointer;
    private next?: InputSubject;
    getSubject(): InputSubject {
        if (!(super.getSubject() instanceof InputSubject)) {
            throw new Error("subject is not BaseClickSubject!");
        }
        return super.getSubject() as InputSubject;
    }
    setPointer(pointer: Pointer) {
        this.pointer = pointer;
    }
    setChainNext(clickPick: InputSubject) {
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
