import FrameBufferObject from "../framebuffer/FrameBufferObject.js";
import DepthFrameBufferObject from "../framebuffer/DepthFrameBufferObject.js";
import Manager from "./Manager.js";


export default class FrameBufferManager extends Manager<FrameBufferObject> {
    addObjects(): void {
        [
            DepthFrameBufferObject,
        ].forEach((ctor) => {
            this.add(ctor);
        });
    }
    async load(): Promise<void> {
        
    }
    init(): void {
    }
    update(): void {

    }
}