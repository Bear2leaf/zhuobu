import device from "../device/Device.js";
import Shader from "./Shader.js";


export class LineShader extends Shader {
    constructor(gl: WebGL2RenderingContext, textCache: Map<string, string>) {
        super(
            gl,
            textCache.get("resource/shader/Line.vert.sk")!,
            textCache.get("resource/shader/Line.frag.sk")!
        );
    }
}
