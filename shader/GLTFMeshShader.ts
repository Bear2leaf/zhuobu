import device from "../device/Device.js";
import Shader from "./Shader.js";


export class GLTFMeshShader extends Shader {
    constructor() {
        super(
            device.getTxtCache().get("resource/shader/Mesh.vert.sk")!,
            device.getTxtCache().get("resource/shader/Mesh.frag.sk")!
        );
    }
}
