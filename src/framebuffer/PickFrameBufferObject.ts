import BaseFrameBufferObject from "./BaseFrameBufferObject.js";

export default class PickFrameBufferObject extends BaseFrameBufferObject {
    private pixels?: Uint8Array;
    private width: number = 0;
    updatePixels(width: number, height: number) {
        this.pixels = this.getGL().readPixels(0, 0, width, height);
        this.width = width;
    }
    getPixels(): Uint8Array {
        if (this.pixels === undefined) {
            throw new Error("PickFrameBufferObject is not initialized.");
        }
        return this.pixels;
    }
    readPixel(x: number, y: number): [number, number, number] {
        const start = (Math.floor(y) * this.width + Math.floor(x)) * 4;
        const pixel = this.getPixels().slice(start, start + 4);
        return [pixel[0], pixel[1], pixel[2]];
    }
}