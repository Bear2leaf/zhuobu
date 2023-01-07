import { OrthoCamera } from "./Camera.js";
import { device } from "./Device.js";
import Renderer from "./Renderer.js";
import { TextShader } from "./Shader.js";
import Text from "./Text.js";
import Texture from "./Texture.js";
import { Vec4 } from "./Vector.js";
export type FontInfo = { [key: string]: { width: number, height: number, x: number, y: number } };

export default class TextRenderer extends Renderer {

    private readonly texture: Texture;
    private readonly fontInfo: FontInfo;
    private readonly textObjects: Text[];
    constructor() {
        super(new TextShader(), device.gl.TRIANGLES, new OrthoCamera())
        this.textObjects = [];

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
    }
    add(text: Text): void {
        this.textObjects.push(text);
    }
    render() {
        for (const text of this.textObjects) {
            this.renderText(text);
        }
    }
    private renderText(text: Text) {
        let { x, y, scale, spacing, chars } = text;
        const texSize = this.texture.getSize();
        const texHeight = texSize.y;
        const texWidth = texSize.x;
        device.gl.activeTexture(device.gl.TEXTURE0);
        const ox = x;
        const oy = y;
        const batch: Vec4[] = [];
        for (const c of chars) {
            const ch = this.fontInfo[c];
            const xpos = x - device.getWindowInfo().windowWidth / 2;
            const ypos = y - device.getWindowInfo().windowHeight / 2;
            const w = ch.width * scale;
            const h = ch.height * scale;
            x += w + spacing;
            if (c === '\n') {
                x = ox;
                y += h + spacing;
                continue;
            } else if (c === ' ') {
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
        this.setVertices(batch)
        this.texture.bind();
        super.render();
    }
}