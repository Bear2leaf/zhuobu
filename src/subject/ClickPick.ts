import PickFrameBufferObject from "../framebuffer/PickFrameBufferObject.js";
import BaseClickSubject from "./BaseClickSubject.js";

export default class ClickPickSubject extends BaseClickSubject {
    private frameBufferObject?: PickFrameBufferObject;
    checkIsPicked(): void {
        const pixel = this.getFrameBufferObject().readPixel(this.getX(), this.getY());
        if (pixel[0] === 0 && pixel[1] === 0 && pixel[2] === 0) {
            return;
        } else {
            this.notify();
        }
    }
    
    getFrameBufferObject() {
        if (!this.frameBufferObject) throw new Error("frameBufferObject is not set!");
        return this.frameBufferObject;
    }
    setFrameBufferObject(frameBufferObject: PickFrameBufferObject) {
        this.frameBufferObject = frameBufferObject;
    }
}
