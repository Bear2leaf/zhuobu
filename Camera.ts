import Character from "./Character.js";
import { ortho, device, multiplyVectorAndMartix, inverse } from "./global.js";

export default class Camera {
    setFollow(character: Character) {
        this.follow = character
    }
    private follow?: Character;
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
    getCameraPosition() {
        return [this.left.toFixed(0), this.top.toFixed(0)]
    }
    getWorldPosition(position: [number, number, number, number]) {
        return multiplyVectorAndMartix(position, this.getMartix())
    }
    getScreenPosition(position: [number, number, number, number]) {
        return multiplyVectorAndMartix(position, inverse(this.getMartix()))
    }
    setZoom(zoom: number) {
        this.zoom = zoom;
    }
    getMartix(): number[] {
        return ortho(...this.rect, -1, 1);
    }
    update() {
        if (this.follow) {
            const pos = this.follow.getPosition();
            this.left = Math.round(pos[0] - this.width / 4);
            this.top = Math.round(pos[1] - this.height / 4);
        }
    }

}