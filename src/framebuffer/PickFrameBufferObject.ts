import BaseFrameBufferObject from "./BaseFrameBufferObject.js";

export default class PickFrameBufferObject extends BaseFrameBufferObject {
    readSinglePixel(x: number, y: number) {
        const gl = this.getGL();
        this.bindPick();
        const pixel = gl.readSinglePixel(x, y);
        this.unbindPick();
        return pixel;
    }
}