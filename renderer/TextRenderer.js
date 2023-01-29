import { OrthoCamera } from "../Camera.js";
import { device } from "../Device.js";
import Renderer from "./Renderer.js";
import { TextShader } from "../Shader.js";
import Texture from "../Texture.js";
import { Vec4 } from "../Vector.js";
export default class TextRenderer extends Renderer {
    constructor() {
        const camera = new OrthoCamera();
        const windowInfo = device.getWindowInfo();
        camera.projection.translate(new Vec4(-windowInfo.windowWidth / 2, -windowInfo.windowHeight / 2, 0, 1));
        super(new TextShader(), device.gl.TRIANGLES, camera);
        this.texture = new Texture();
        const fontInfo = device.fontCache.get("static/font/font_info.json");
        if (!fontInfo) {
            throw new Error("fontInfo not exist");
        }
        this.fontInfo = fontInfo;
        const fontImage = device.imageCache.get("static/font/boxy_bold_font.png");
        if (!fontImage) {
            throw new Error("fontImage not exist");
        }
        this.texture.generate(fontImage);
        this.setTextureUnit();
        device.gl.enable(device.gl.BLEND);
        device.gl.blendFunc(device.gl.ONE, device.gl.ONE_MINUS_SRC_ALPHA);
    }
    add(text) {
        text.create(this.texture, this.fontInfo);
        super.add(text);
    }
    render() {
        this.texture.bind();
        super.render();
    }
}
//# sourceMappingURL=TextRenderer.js.map