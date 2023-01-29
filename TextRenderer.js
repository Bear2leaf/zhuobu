import { OrthoCamera } from "./Camera.js";
import { device } from "./Device.js";
import Renderer from "./Renderer.js";
import { TextShader } from "./Shader.js";
import Texture from "./Texture.js";
import { Vec4 } from "./Vector.js";
export default class TextRenderer extends Renderer {
    constructor() {
        const camera = new OrthoCamera();
        const windowInfo = device.getWindowInfo();
        camera.projection.translate(new Vec4(-windowInfo.windowWidth / 2, -windowInfo.windowHeight / 2, 0, 1));
        super(new TextShader(), device.gl.TRIANGLES, camera);
        this.textObjects = [];
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
        this.textObjects.push(text);
    }
    render() {
        for (const text of this.textObjects) {
            this.renderText(text);
        }
    }
    renderText(text) {
        let { x, y, scale, spacing, chars } = text;
        const texSize = this.texture.getSize();
        const texHeight = texSize.y;
        const texWidth = texSize.x;
        device.gl.activeTexture(device.gl.TEXTURE0);
        const ox = x;
        const oy = y;
        const batch = [];
        for (const c of chars) {
            const ch = this.fontInfo[c];
            const xpos = x;
            const ypos = y;
            const w = ch.width * scale;
            const h = ch.height * scale;
            x += w + spacing;
            if (c === '\n') {
                x = ox;
                y += h + spacing;
                continue;
            }
            else if (c === ' ') {
                continue;
            }
            // update VBO for each character
            const vertices = [
                new Vec4(xpos, ypos + h, (ch.x) / texWidth, (ch.y + ch.height) / texHeight),
                new Vec4(xpos + w, ypos, (ch.x + ch.width) / texWidth, (ch.y) / texHeight),
                new Vec4(xpos, ypos, (ch.x) / texWidth, (ch.y) / texHeight),
                new Vec4(xpos, ypos + h, (ch.x) / texWidth, (ch.y + ch.height) / texHeight),
                new Vec4(xpos + w, ypos + h, (ch.x + ch.width) / texWidth, (ch.y + ch.height) / texHeight),
                new Vec4(xpos + w, ypos, (ch.x + ch.width) / texWidth, (ch.y) / texHeight)
            ];
            batch.push(...vertices);
        }
        this.setVertices(batch);
        this.setIndices(new Array(batch.length).fill(0).map((_, index) => index));
        this.texture.bind();
        super.render();
    }
}
//# sourceMappingURL=TextRenderer.js.map