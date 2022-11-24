import GameObject from "./game_object.js";
const POWERUP_SIZE = [60, 20];
const VELOCITY = [0, 150];
export default class PowerUp extends GameObject {
    constructor(type, color, duration, position, texture) {
        super(position, POWERUP_SIZE, texture, color, VELOCITY);
        this.type = type;
        this.duration = duration;
        this.activated = false;
    }
}
//# sourceMappingURL=power_up.js.map