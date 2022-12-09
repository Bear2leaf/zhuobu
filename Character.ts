import GameObject from "./GameObject.js";

export default class Character implements GameObject {
    getPosition(): [number, number] {
        return [this.x, this.y];
    }
    private velocityX: number;
    private x: number;
    private velocityY: number;
    private y: number;
    private readonly speed: number;
    constructor() {
        this.speed = 0.01;
        this.x = 0;
        this.y = 0;
        this.velocityX = 0;
        this.velocityY = 0;
    }
    setVelocity(velocity: [number, number]) {
        this.velocityX = velocity[0];
        this.velocityY = velocity[1];
    }
    update() {
        this.x += this.velocityX * this.speed;
        this.y += this.velocityY * this.speed;
    }
}