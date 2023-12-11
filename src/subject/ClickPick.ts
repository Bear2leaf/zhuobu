import PickFrameBufferObject from "../framebuffer/PickFrameBufferObject.js";
import BaseTouchSubject from "./BaseTouchSubject.js";

export default class ClickPickSubject extends BaseTouchSubject {

    private frameBufferObject?: PickFrameBufferObject;
    checkIsPicked(): void {
        const pixel = this.getFrameBufferObject().readPixel(this.getTouch().getScreenX(), this.getTouch().getScreenY());
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
