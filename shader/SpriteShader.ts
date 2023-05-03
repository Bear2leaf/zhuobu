import { device } from "../device/Device.js";
import Shader from "./Shader.js";


export class SpriteShader extends Shader {
    constructor() {
        super(
            device.getTxtCache().get("static/shader/Sprite.vert.sk")!,
            device.getTxtCache().get("static/shader/Sprite.frag.sk")!
        );
    }
}
