import device from "../device/Device.js";
import Shader from "./Shader.js";


export class GLTFSkinShader extends Shader {
    constructor() {
        super(
            device.getTxtCache().get("static/shader/Skin.vert.sk")!,
            device.getTxtCache().get("static/shader/Skin.frag.sk")!
        );
    }
}
