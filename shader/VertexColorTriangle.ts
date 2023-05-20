import Shader from "./Shader.js";


export class VertexColorTriangle extends Shader {
    constructor(gl: WebGL2RenderingContext, textCache: Map<string, string>) {
        super(
            gl,
            textCache.get("resource/shader/VertexColorTriangle.vert.sk")!,
            textCache.get("resource/shader/VertexColorTriangle.frag.sk")!
        );
    }
}
