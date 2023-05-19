import Shader from "./Shader.js";


export class PointShader extends Shader {
    constructor(gl: WebGL2RenderingContext, textCache: Map<string, string>) {
        super(
            gl,
            textCache.get("resource/shader/Point.vert.sk")!,
            textCache.get("resource/shader/Point.frag.sk")!
        );
    }
}
