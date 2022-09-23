export default class Particle {
    readonly position: Vec2;
    readonly velocity: Vec2;
    readonly color: Vec4;
    life: number;

    constructor() {
        this.position = [0, 0];
        this.velocity = [0, 0];
        this.color = [1, 1, 1, 1];
        this.life = 0

    }
} 