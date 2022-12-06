import GameObject from "./GameObject.js";

export default class Graphic implements GameObject {

    x: number;
    y: number;
    scale: number;
    readonly color: [number, number, number, number];
    constructor(x: number, y: number, scale: number, color: [number, number, number, number]) {
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.color = color;
    }
    update(): void {
        throw new Error("Method not implemented.");
    }

}