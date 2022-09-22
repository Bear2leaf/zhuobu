import GameObject from "./game_object";
import Texture2D from "./texture";
import v3 from "./v3";

export default class BallObject extends GameObject {
    radius: number;
    stuck: boolean;
    constructor(pos: Vec2, radius: number = 12.5, velocity: Vec2, sprite: Texture2D) {
        super(pos, [radius * 2, radius * 2], sprite, [1, 1, 1], velocity);
        this.radius = radius;
        this.stuck = true;
    }
    move(dt: number, windowWidth: number) {
        if (!this.stuck) {
            v3.add(this.position, [this.velocity[0] * dt, this.velocity[1] * dt, 0], this.position)
            if (this.position[0] <= 0) {
                this.velocity[0] = -this.velocity[0]
            } else if (this.position[0] + this.size[0] >= windowWidth) {
                this.velocity[0] = -this.velocity[0];
                this.position[0] = windowWidth - this.size[0];
            }
            if (this.position[1] <= 0) {
                this.velocity[1] = -this.velocity[1]
                this.position[1] = 0
            }
        }
        return this.position
    }
    reset(position: Vec2, velocity: Vec2) {
        console.log(velocity)
        this.position = [...position, 0];
        this.velocity = velocity;
        this.stuck = true;
    }
}