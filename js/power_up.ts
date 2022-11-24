import GameObject from "./game_object.js";
import Texture2D from "./texture.js";

const POWERUP_SIZE: Vec2 = [60, 20];
const VELOCITY: Vec2 = [0, 150];

export default class PowerUp extends GameObject {
    type: string;
    duration: number;
    activated: boolean;
    constructor(type: string, color: Vec3, duration: number, position: Vec2, texture: Texture2D){
        super(position, POWERUP_SIZE, texture, color, VELOCITY)
        this.type = type;
        this.duration = duration;
        this.activated = false;

    }
}