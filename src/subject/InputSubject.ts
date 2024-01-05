import Subject from "./Subject.js";

export default abstract class InputSubject extends Subject {
    private pixelRatio = 1;
    private x = 0;
    private y = 0;
    setPixelRatio(pixelRatio: number) {
        this.pixelRatio = pixelRatio;
    }
    setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    getPixelRatio(): number {
        return this.pixelRatio;
    }
    getX(): number {
        return this.x;
    }
    getY(): number {
        return this.y;
    }
    getScreenX(): number {
        return this.x * this.pixelRatio;
    }
    getScreenY(): number {
        return this.y * this.pixelRatio;
    }
}
