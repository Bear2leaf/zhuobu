import Camera from "../Camera.js";
import { device } from "../Device.js";
import Sprite from "../drawobject/Sprite.js";
import {Sprite  as SpriteShader} from "../Shader.js";
import Renderer from "./Renderer.js";
export type FontInfo = { [key: string]: { width: number, height: number, x: number, y: number } };

export default class SpriteRenderer extends Renderer {
    constructor() {
        super(new SpriteShader())
        device.gl.enable(device.gl.BLEND);
        device.gl.blendFunc(device.gl.ONE, device.gl.ONE_MINUS_SRC_ALPHA);
        device.gl.pixelStorei(device.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    }
    render(camera: Camera, sprite: Sprite) {
        super.render(camera, sprite);
        sprite.draw(device.gl.TRIANGLES)
    }
}