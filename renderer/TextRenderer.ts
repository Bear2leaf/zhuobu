import Camera from "../camera/Camera.js";
import Renderer from "./Renderer.js";
import { SpriteShader } from "../shader/SpriteShader.js";
import Text from "../drawobject/Text.js";
export type FontInfo = { [key: string]: { width: number, height: number, x: number, y: number } };

export default class TextRenderer extends Renderer {

    private readonly primitiveType: number;
    private readonly fontInfo: FontInfo;
    constructor(gl: WebGL2RenderingContext, textCache: Map<string, string>, fontInfo: FontInfo) {
        
        super(new SpriteShader(gl, textCache))
        this.primitiveType = gl.TRIANGLES;
        this.fontInfo = fontInfo;
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    }
    render(camera: Camera, text: Text) {
        text.create(this.fontInfo);
        super.render(camera, text);
        text.draw(this.primitiveType)
    }
}