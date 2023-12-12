import OffscreenCanvas from "./OffscreenCanvas.js";

export default class SingleColorCanvas extends OffscreenCanvas {
    readPixels(x: number, y: number, width = 1, height = 1) {
        return this.getContext().readPixels(x, y, width, height)
    }
    fillWithColor(r: number, g: number, b: number) {
        const context = this.getContext();
        context.clear(r, g, b);
    }
    clearRect(x: number, y: number, width: number, height: number) {
        const context = this.getContext();
        context.clearRect(x, y, width, height);
    }
    fillWithText(text: string) {
        const context = this.getContext();
        context.updateFont("48px serif", "alphabetic", "left", "chocolate");
        context.putText(text);
    }

}