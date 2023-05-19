import Shader from "./Shader.js";


export class SpriteShader extends Shader {
    constructor(gl: WebGL2RenderingContext, textCache: Map<string, string>) {
        super(
            gl,
            textCache.get("resource/shader/Sprite.vert.sk")!,
            textCache.get("resource/shader/Sprite.frag.sk")!
        );
    }
}
