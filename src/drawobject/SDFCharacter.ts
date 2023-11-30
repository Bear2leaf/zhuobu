import { flatten, Vec2, Vec4 } from "../geometry/Vector.js";
import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import GLContainer from "../container/GLContainer.js";
import { FontInfo } from "./Text.js";

export default class SDFCharacter extends DrawObject {
    private color: [number, number, number, number] = [1, 1, 1, 1];
    private spacing: number = 0;
    private chars: string[] = [];
    private readonly texSize: Vec2 = new Vec2(0, 0);
    private readonly colors: Vec4[] = [];
    private readonly indices: number[] = [];
    private readonly vertices: Vec4[] = [];
    private readonly texcoords: Vec4[] = []
    private fontInfo: FontInfo = {};
    setFontInfo(fontInfo: FontInfo, texWidth: number, texHeight: number) {
        this.fontInfo = fontInfo;
        this.texSize.x = texWidth;
        this.texSize.y = texHeight;
    }
    getFontInfo(): FontInfo {
        if (this.fontInfo === undefined) {
            throw new Error("FontInfo is not set");
        }
        return this.fontInfo;
    }
    init() {
        super.init();
        this.createABO(ArrayBufferIndex.Position, new Float32Array(0), 4)
        this.createABO(ArrayBufferIndex.Color, new Float32Array(0), 4)
        this.createABO(ArrayBufferIndex.TextureCoord, new Float32Array(0), 4);
    }
    updateChars(chars: string) {
        this.chars.splice(0, this.chars.length, ...chars);
    }
    create(fontInfo: FontInfo) {
        let { x, y } = new Vec2(0, 0);
        const scale = new Vec2(1, 1);
        const { spacing, chars } = this;
        const texHeight = this.texSize.y;
        const texWidth = this.texSize.x;
        const ox = x;
        this.vertices.splice(0, this.vertices.length);
        this.texcoords.splice(0, this.texcoords.length);
        const batch = this.vertices;
        const batchTexcoords = this.texcoords;
        for (const c of chars) {
            const ch = fontInfo[c];
            const xpos = x;
            const ypos = y;
            const w = ch.width * scale.x;
            const h = ch.height * scale.y;
            x += w + spacing;
            if (c === '\n') {
                x = ox;
                y += h + spacing;
                continue;
            } else if (c === ' ') {
                continue;
            }
            const vertices = [
                new Vec4(xpos, ypos + h), new Vec4(xpos + w, ypos), new Vec4(xpos, ypos),
                new Vec4(xpos, ypos + h), new Vec4(xpos + w, ypos + h), new Vec4(xpos + w, ypos)
            ];
            const texcoords = [
                new Vec4((ch.x) / texWidth, (ch.y + ch.height) / texHeight),
                new Vec4((ch.x + ch.width) / texWidth, (ch.y) / texHeight),
                new Vec4((ch.x) / texWidth, (ch.y) / texHeight),
                new Vec4((ch.x) / texWidth, (ch.y + ch.height) / texHeight),
                new Vec4((ch.x + ch.width) / texWidth, (ch.y + ch.height) / texHeight),
                new Vec4((ch.x + ch.width) / texWidth, (ch.y) / texHeight)
            ];
            batch.push(...vertices);
            batchTexcoords.push(...texcoords);
        }
        this.indices.splice(0, this.indices.length, ...new Array(batch.length).fill(0).map((_, index) => index))
        this.colors.splice(0, this.colors.length, ...new Array(batch.length).fill(0).map(() => new Vec4(this.color[0], this.color[1], this.color[2], this.color[3])));
    }
    draw(mode: number): void {
        this.bind();
        this.create(this.fontInfo);
        this.updateABO(ArrayBufferIndex.Position, flatten(this.vertices));
        this.updateABO(ArrayBufferIndex.Color, flatten(this.colors));
        this.updateABO(ArrayBufferIndex.TextureCoord, flatten(this.texcoords));
        this.updateEBO(new Uint16Array(this.indices));
        this.getEntity().get(GLContainer).getRenderingContext().switchBlend(true);
        this.getEntity().get(GLContainer).getRenderingContext().switchNearestFilter(false);
        this.getEntity().get(GLContainer).getRenderingContext().switchDepthWrite(false);
        super.draw(mode);
        this.getEntity().get(GLContainer).getRenderingContext().switchDepthWrite(true);
        this.getEntity().get(GLContainer).getRenderingContext().switchNearestFilter(true);
        this.getEntity().get(GLContainer).getRenderingContext().switchBlend(false);
    }
}