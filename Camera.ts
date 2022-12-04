import { ortho, device, multiplyVectorAndMartix, inverse } from "./global.js";

export default class Camera {
    getWorldPosition(position: [number, number, number, number]) {
        return multiplyVectorAndMartix(position, this.getMartix())
    }
    getScreenPosition(position: [number, number, number, number]) {
        return multiplyVectorAndMartix(position, inverse(this.getMartix()))
    }
    private zoom: number = 1;
    private left: number = 0;
    private get right(): number {
        return (this.left + this.width / this.zoom);
    }
    private get bottom(): number {
        return (this.top + this.height / this.zoom);
    }
    private top: number = 0;
    private readonly width = device.getWindowInfo().windowWidth;
    private readonly height = device.getWindowInfo().windowHeight;
    private get rect(): [number, number, number, number] {
        return [this.left, this.right, this.bottom, this.top]
    }
    moveTo(x: number, y: number) {
        this.left = x;
        this.top = y;
    }
    setZoom(zoom: number) {
        this.zoom = zoom;
    }
    getMartix(): number[] {
        return ortho(...this.rect, -1, 1);
    }

}