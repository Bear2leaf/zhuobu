import Camera from "../Camera.js";
import { device } from "../Device.js";
import Renderer from "./Renderer.js";
import { TextShader } from "../Shader.js";
import Texture from "../Texture.js";
import Text from "../drawobject/Text.js";
export type FontInfo = { [key: string]: { width: number, height: number, x: number, y: number } };

export default class TextRenderer extends Renderer {

    private readonly texture: Texture;
    private readonly fontInfo: FontInfo;
    constructor() {
        
        super(new TextShader())
        this.texture = new Texture();
        const fontInfo = device.fontCache.get("static/font/font_info.json");
        if (!fontInfo) {
            throw new Error("fontInfo not exist")
        }
        this.fontInfo = fontInfo;
        const fontImage = device.imageCache.get("static/font/boxy_bold_font.png");
        if (!fontImage) {
            throw new Error("fontImage not exist")
        }
        this.texture.generate(fontImage);
        this.setTextureUnit();
        device.gl.enable(device.gl.BLEND);
        device.gl.blendFunc(device.gl.ONE, device.gl.ONE_MINUS_SRC_ALPHA);
        device.gl.pixelStorei(device.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    }
    render(camera: Camera, text: Text) {
        text.create(this.fontInfo, this.texture.getSize());
        this.texture.bind(); 
        super.render(camera, text);
        text.draw(device.gl.TRIANGLES)
    }
}