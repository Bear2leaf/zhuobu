import device from "../device/Device.js";
import Shader from "./Shader.js";


export class GLTFSkinShader extends Shader {
    constructor() {
        super(
            device.getTxtCache().get("resource/shader/Skin.vert.sk")!,
            device.getTxtCache().get("resource/shader/Skin.frag.sk")!
        );
    }
}
