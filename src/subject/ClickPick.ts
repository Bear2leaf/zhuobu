import PickFrameBufferObject from "../framebuffer/PickFrameBufferObject.js";
import { Vec3 } from "../geometry/Vector.js";
import BaseTouchSubject from "./BaseTouchSubject.js";

export default class ClickPickSubject extends BaseTouchSubject {

    private frameBufferObject?: PickFrameBufferObject;
    private readonly color: Vec3 = new Vec3();
    getColor(): Vec3 {
        return this.color;
    }
    checkIsPicked(): void {
        if (this.color.x === 0 && this.color.y === 0 && this.color.z === 0) return;
        const pixel = this.getFrameBufferObject().readPixel(this.getTouch().getScreenX(), this.getTouch().getScreenY());

        if (pixel[0] === this.color.x && pixel[1] === this.color.y && pixel[2] === this.color.z) {
            this.notify();
        }
        this.color.set(0, 0, 0);

    }
    getFrameBufferObject() {
        if (!this.frameBufferObject) throw new Error("frameBufferObject is not set!");
        return this.frameBufferObject;
    }
    setFrameBufferObject(frameBufferObject: PickFrameBufferObject) {
        this.frameBufferObject = frameBufferObject;
    }
}
