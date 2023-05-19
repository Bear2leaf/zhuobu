import device from "../device/Device.js";
import Shader from "./Shader.js";


export class GLTFMeshShader extends Shader {
    constructor(gl: WebGL2RenderingContext, textCache: Map<string, string>) {
        super(
            gl,
            textCache.get("resource/shader/Mesh.vert.sk")!,
            textCache.get("resource/shader/Mesh.frag.sk")!
        );
    }
}
