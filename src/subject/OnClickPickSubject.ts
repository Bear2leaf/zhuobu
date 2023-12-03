import DrawObject from "../drawobject/DrawObject.js";
import TouchEvent from "../event/TouchEvent.js";
import FrameBufferObject from "../framebuffer/FrameBufferObject.js";
import { Vec3 } from "../geometry/Vector.js";
import BaseTouchSubject from "./BaseTouchSubject.js";

export default class OnClickPickSubject extends BaseTouchSubject {

    private frameBufferObject?: FrameBufferObject;
    private isActivated: boolean = false;
    private readonly color: Vec3 = new Vec3();
    activate(): void {
        this.isActivated = true;
    }
    deactivate(): void {
        this.isActivated = false;
    }
    getIsActive(): boolean {
        return this.isActivated;
    }
    getColor(): Vec3 {
        return this.color;
    }
    checkIsPicked(): void {
        if (this.color.x === 0 && this.color.y === 0 && this.color.z === 0) return;
        this.getFrameBufferObject().bindPick();
        const touch = this.getEntity().get(TouchEvent);
        const color = this.getEntity().get(DrawObject).getRenderingContext().readSinglePixel(touch.getScreenX(), touch.getScreenY());
        if (this.color.x === color.x && this.color.y === color.y && this.color.z === color.z) {
            this.notify();
        }
        this.getFrameBufferObject().unbindPick();
    }
    getFrameBufferObject() {
        if (!this.frameBufferObject) throw new Error("frameBufferObject is not set!");
        return this.frameBufferObject;
    }
    setFrameBufferObject(frameBufferObject: FrameBufferObject) {
        this.frameBufferObject = frameBufferObject;
    }
    update(): void {
        const touchEvent = this.getEntity().get(TouchEvent);
        if (touchEvent.getIsTouchingStart()) {
            this.checkIsPicked();
        }
    }
}
