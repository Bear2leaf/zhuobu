import Camera from "../camera/Camera.js";
import DrawObject from "../drawobject/DrawObject.js";
import { SpriteShader as SpriteShader } from "../shader/SpriteShader.js";
import Node from "../structure/Node.js";
import Renderer from "./Renderer.js";

export default class SpriteRenderer extends Renderer {
    private readonly primitiveType: number
    private readonly gl: WebGL2RenderingContext
    constructor(gl: WebGL2RenderingContext, textCache: Map<string, string>) {
        super(new SpriteShader(gl, textCache));
        this.primitiveType = gl.TRIANGLES;
        this.gl = gl;
        this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
    }
    render(camera: Camera, node: Node) {
        this.gl.enable(this.gl.BLEND);
        this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        super.render(camera, node);
        node.getDrawObjects().forEach(sprite => {
            sprite.draw(this.primitiveType)
        });
        this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        this.gl.disable(this.gl.BLEND);
    }
}