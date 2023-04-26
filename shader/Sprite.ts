import { device } from "../device/Device.js";
import Shader from "./Shader.js";


export class Sprite extends Shader {
    constructor() {
        super(
            device.getTxtCache().get("static/shader/Sprite.vert.txt")!,
            device.getTxtCache().get("static/shader/Sprite.frag.txt")!
        );
    }
}
