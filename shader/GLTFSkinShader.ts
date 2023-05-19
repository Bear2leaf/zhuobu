import device from "../device/Device.js";
import Shader from "./Shader.js";


export class GLTFSkinShader extends Shader {
    constructor(gl: WebGL2RenderingContext, textCache: Map<string, string>) {
        super(
            gl,
            textCache.get("resource/shader/Skin.vert.sk")!,
            textCache.get("resource/shader/Skin.frag.sk")!
        );
    }
}
