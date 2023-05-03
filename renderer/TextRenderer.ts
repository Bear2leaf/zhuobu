import Camera from "../camera/Camera.js";
import device from "../device/Device.js";
import Renderer from "./Renderer.js";
import { SpriteShader } from "../shader/SpriteShader.js";
import Text from "../drawobject/Text.js";
export type FontInfo = { [key: string]: { width: number, height: number, x: number, y: number } };

export default class TextRenderer extends Renderer {

    private readonly fontInfo: FontInfo;
    constructor() {
        
        super(new SpriteShader())
        const fontInfo = device.getFontCache().get("static/font/boxy_bold_font.json");
        if (!fontInfo) {
            throw new Error("fontInfo not exist")
        }
        this.fontInfo = fontInfo;
        device.gl.enable(device.gl.BLEND);
        device.gl.blendFunc(device.gl.ONE, device.gl.ONE_MINUS_SRC_ALPHA);
        device.gl.pixelStorei(device.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    }
    render(camera: Camera, text: Text) {
        text.create(this.fontInfo);
        super.render(camera, text);
        text.draw(device.gl.TRIANGLES)
    }
}