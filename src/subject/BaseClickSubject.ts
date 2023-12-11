import Subject from "./Subject.js";

export default abstract class BaseClickSubject extends Subject {
    private x = 0;
    private y = 0;
    setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    getX(): number {
        return this.x;
    }
    getY(): number {
        return this.y;
    }
}
