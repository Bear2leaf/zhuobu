import BaseFrameBufferObject from "./BaseFrameBufferObject.js";

export default class PickFrameBufferObject extends BaseFrameBufferObject {
    readSinglePixel(x: number, y: number) {
        const gl = this.getGL();
        this.bindRead();
        const pixel = gl.readSinglePixel(x, y);
        this.unbindRead();
        return pixel;
    }
}