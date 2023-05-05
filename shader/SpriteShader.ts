import device from "../device/Device.js";
import Shader from "./Shader.js";


export class SpriteShader extends Shader {
    constructor() {
        super(
            device.getTxtCache().get("resource/shader/Sprite.vert.sk")!,
            device.getTxtCache().get("resource/shader/Sprite.frag.sk")!
        );
    }
}
