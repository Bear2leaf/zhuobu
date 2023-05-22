import Camera from "../camera/Camera.js";
import Renderer from "./Renderer.js";
import { SpriteShader } from "../shader/SpriteShader.js";
import Text from "../drawobject/Text.js";
import Node from "../structure/Node.js";
export type FontInfo = { [key: string]: { width: number, height: number, x: number, y: number } };

export default class TextRenderer extends Renderer {

    private readonly primitiveType: number;
    constructor(gl: WebGL2RenderingContext, textCache: Map<string, string>) {

        super(new SpriteShader(gl, textCache))
        this.primitiveType = gl.TRIANGLES;
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    }
    render(camera: Camera, node: Node) {
        super.render(camera, node);
        node.getDrawObjects().forEach(text => {
            text.draw(this.primitiveType)
        });
    }
}