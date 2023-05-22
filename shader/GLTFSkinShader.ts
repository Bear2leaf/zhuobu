import Shader from "./Shader.js";


export class GLTFSkinShader extends Shader {
    constructor(gl: WebGL2RenderingContext, textCache: Map<string, string>) {
        super(
            gl,
            textCache.get("resource/shader/SkinMesh.vert.sk")!,
            textCache.get("resource/shader/SkinMesh.frag.sk")!
        );
    }
}
