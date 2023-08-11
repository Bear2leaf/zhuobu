import GLContainer from "../component/GLContainer.js";
import TouchEventContainer from "../component/TouchEventContainer.js";
import FrameBufferObject from "../framebuffer/FrameBufferObject.js";
import { Vec3, Vec2 } from "../math/Vector.js";
import Renderer from "../renderer/Renderer.js";
import DemoSubject from "./DemoSubject.js";

export default class OnClickPickSubject extends DemoSubject {

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
        const touch = this.getEntity().get(TouchEventContainer);
        const color = this.getEntity().get(GLContainer).getRenderingContext().readSinglePixel(touch.getX(), touch.getY());
        if (this.color.x === color.x && this.color.y === color.y && this.color.z === color.z) {
            this.notify();
        }
    }
    getFrameBufferObject() {
        if (!this.frameBufferObject) throw new Error("frameBufferObject is not set!");
        return this.frameBufferObject;
    }
    setFrameBufferObject(frameBufferObject: FrameBufferObject) {
        this.frameBufferObject = frameBufferObject;
    }
    update(): void {
        const touchEvent = this.getEntity().get(TouchEventContainer);
        if (touchEvent.getIsTouchingStart()) {
            this.getFrameBufferObject().bind();
            this.checkIsPicked();
            this.getFrameBufferObject().unbind();
        }
    }
}
