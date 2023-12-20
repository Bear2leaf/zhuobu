import PickFrameBufferObject from "../framebuffer/PickFrameBufferObject.js";
import BaseClickSubject from "./BaseClickSubject.js";

export default class ClickPickSubject extends BaseClickSubject {
    private frameBufferObject?: PickFrameBufferObject;
    
    getFrameBufferObject() {
        if (!this.frameBufferObject) throw new Error("frameBufferObject is not set!");
        return this.frameBufferObject;
    }
    setFrameBufferObject(frameBufferObject: PickFrameBufferObject) {
        this.frameBufferObject = frameBufferObject;
    }
}
