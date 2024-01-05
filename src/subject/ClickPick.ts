import PickFrameBufferObject from "../framebuffer/PickFrameBufferObject.js";
import InputSubject from "./InputSubject.js";

export default class ClickPickSubject extends InputSubject {
    private frameBufferObject?: PickFrameBufferObject;
    
    getFrameBufferObject() {
        if (!this.frameBufferObject) throw new Error("frameBufferObject is not set!");
        return this.frameBufferObject;
    }
    setFrameBufferObject(frameBufferObject: PickFrameBufferObject) {
        this.frameBufferObject = frameBufferObject;
    }
}
