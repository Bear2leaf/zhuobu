import Pointer from "../drawobject/Pointer.js";
import InputSubject from "../subject/InputSubject.js";
import Observer from "./Observer.js";

export default class OnClick extends Observer {
    private pointer?: Pointer;
    private next?: InputSubject;
     x = 0;
     y = 0;
     pixelRatio = 1;
    setPointer(pointer: Pointer) {
        this.pointer = pointer;
    }
    setChainNext(clickPick: InputSubject) {
        this.next = clickPick;
    }
    public notify(): void {
        this.pointer?.onClick(this.x, this.y);
        if (this.next) {
            this.next.setPosition(this.x, this.y);
            this.next.setPixelRatio(this.pixelRatio);
            this.next.notify();
        }
    }
}
