import GameObject from "./game_object.js";
import v3 from "./v3.js";
export default class BallObject extends GameObject {
    constructor(pos, radius = 12.5, velocity, sprite) {
        super(pos, [radius * 2, radius * 2], sprite, [1, 1, 1], velocity);
        this.radius = radius;
        this.stuck = true;
    }
    move(dt, windowWidth) {
        if (!this.stuck) {
            v3.add(this.position, [this.velocity[0] * dt, this.velocity[1] * dt, 0], this.position);
            if (this.position[0] <= 0) {
                this.velocity[0] = -this.velocity[0];
            }
            else if (this.position[0] + this.size[0] >= windowWidth) {
                this.velocity[0] = -this.velocity[0];
                this.position[0] = windowWidth - this.size[0];
            }
            if (this.position[1] <= 0) {
                this.velocity[1] = -this.velocity[1];
                this.position[1] = 0;
            }
        }
        return this.position;
    }
    reset(position, velocity) {
        this.position[0] = position[0];
        this.position[1] = position[1];
        this.position[2] = 0;
        this.velocity[0] = velocity[0];
        this.velocity[1] = velocity[1];
        this.stuck = true;
    }
}
//# sourceMappingURL=ball_object.js.map