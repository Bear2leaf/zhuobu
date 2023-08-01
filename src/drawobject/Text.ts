import { flatten, Vec2, Vec4 } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import TRS from "../component/TRS.js";
import FontInfoContainer from "../component/FontInfoContainer.js";
import TextureContainer from "../component/TextureContainer.js";
import GLContainer from "../component/GLContainer.js";

export type FontInfo = { [key: string]: { width: number, height: number, x: number, y: number } };
export default class Text extends DrawObject {
    private color: [number, number, number, number] = [1, 1, 1, 1];
    private spacing: number = 1;
    private chars: string[] = [];
    private readonly colors: Vec4[] = [];
    private readonly indices: number[] = [];
    private readonly vertices: Vec4[] = [];
    private readonly texcoords: Vec4[] = []
    private fontInfo: FontInfo = {};
    init() {
        super.init();
        const spacing = 1;
        this.createABO(ArrayBufferIndex.Position, new Float32Array(0), 4)
        this.createABO(ArrayBufferIndex.Color, new Float32Array(0), 4)
        this.createABO(ArrayBufferIndex.TextureCoord, new Float32Array(0), 4);
        this.color = [1, 1, 1, 1];
        this.spacing = spacing;
        this.chars = [..."Hello world!"];
        this.fontInfo = this.getEntity().get(FontInfoContainer).getFontInfo();
        const scale = 4;
        this.getEntity().get(TRS).getScale().set(scale, -scale, scale, 1);
        this.getEntity().get(TRS).getPosition().add(new Vec4(0, scale * 8, 0, 0))
    }
    updateChars(chars: string) {
        this.chars.splice(0, this.chars.length, ...chars);
    }
    create(fontInfo: FontInfo, texSize: Vec2) {
        const trs = this.getEntity().get(TRS);
        let { x, y } = trs.getPosition();
        const scale = trs.getScale();
        let { spacing, chars } = this;
        const texHeight = texSize.y;
        const texWidth = texSize.x;
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
            // update VBO for each character
            const vertices = [
                new Vec4(xpos, ypos + h),
                new Vec4(xpos + w, ypos),
                new Vec4(xpos, ypos),
                new Vec4(xpos, ypos + h),
                new Vec4(xpos + w, ypos + h),
                new Vec4(xpos + w, ypos)
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
        this.create(this.fontInfo, this.getEntity().get(TextureContainer).getTexture().getSize());
        this.updateABO(ArrayBufferIndex.Position, flatten(this.vertices));
        this.updateABO(ArrayBufferIndex.Color, flatten(this.colors));
        this.updateABO(ArrayBufferIndex.TextureCoord, flatten(this.texcoords));
        this.updateEBO(new Uint16Array(this.indices));
        // this.getEntity().get(GLContainer).getRenderingContext().switchDepthWrite(false);
        this.getEntity().get(GLContainer).getRenderingContext().switchDepthTest(false);
        this.getEntity().get(GLContainer).getRenderingContext().switchBlend(true);
        // this.getEntity().get(GLContainer).getRenderingContext().switchUnpackPremultiplyAlpha(true);
        super.draw(mode);
        // this.getEntity().get(GLContainer).getRenderingContext().switchUnpackPremultiplyAlpha(false);
        this.getEntity().get(GLContainer).getRenderingContext().switchBlend(false);
        this.getEntity().get(GLContainer).getRenderingContext().switchDepthTest(true);
        // this.getEntity().get(GLContainer).getRenderingContext().switchDepthWrite(true);
    }

}