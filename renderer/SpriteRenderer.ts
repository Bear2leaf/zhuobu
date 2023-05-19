import Camera from "../camera/Camera.js";
import DrawObject from "../drawobject/DrawObject.js";
import { SpriteShader as SpriteShader } from "../shader/SpriteShader.js";
import Renderer from "./Renderer.js";

export default class SpriteRenderer extends Renderer {
    private readonly primitiveType: number
    constructor(gl: WebGL2RenderingContext, textCache: Map<string, string>) {
        super(new SpriteShader(gl, textCache));
        this.primitiveType = gl.TRIANGLES;
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    }
    render(camera: Camera, sprite: DrawObject) {
        super.render(camera, sprite);
        sprite.draw(this.primitiveType)
    }
}