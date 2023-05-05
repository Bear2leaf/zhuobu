import device from "../device/Device.js";
import Shader from "./Shader.js";


export class PointShader extends Shader {
    constructor() {
        super(
            device.getTxtCache().get("resource/shader/Point.vert.sk")!,
            device.getTxtCache().get("resource/shader/Point.frag.sk")!
        );
    }
}
