import Graphic from "./Graphic.js";

export default class Point extends Graphic {
    private readonly position: [number, number]
    constructor(position: [number, number], color: [number, number, number, number]) {
        super(5, 5, 10, color);
        this.position = position;
    }
    update(): void {
        this.x = this.position[0];
        this.y = this.position[1];
    }
}