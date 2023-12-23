import BaseFrameBufferObject from "./BaseFrameBufferObject.js";

export default class PickFrameBufferObject extends BaseFrameBufferObject {
    private pixels?: Uint8Array;
    updatePixels(x: number, y: number) {
        this.pixels = this.getGL().readPixels(x, y, 1, 1);
    }
    getPixels(): Uint8Array {
        if (this.pixels === undefined) {
            throw new Error("PickFrameBufferObject is not initialized.");
        }
        return this.pixels;
    }
    readPixel(): [number, number, number] {
        const pixel = this.getPixels();
        return [pixel[0], pixel[1], pixel[2]];
    }
}