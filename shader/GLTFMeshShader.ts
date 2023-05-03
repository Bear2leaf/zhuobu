import { device } from "../device/Device.js";
import Shader from "./Shader.js";


export class GLTFMeshShader extends Shader {
    constructor() {
        super(
            device.getTxtCache().get("static/shader/Mesh.vert.sk")!,
            device.getTxtCache().get("static/shader/Mesh.frag.sk")!
        );
    }
}
