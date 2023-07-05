import { flatten, Vec2, Vec4 } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import { TextureIndex } from "../texture/Texture.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";
import FontInfoContainer from "../component/FontInfoContainer.js";

export type FontInfo = { [key: string]: { width: number, height: number, x: number, y: number } };
export default class Text extends DrawObject {
    private x: number = 0;
    private y: number = 0;
    private scale: number  = 1;
    private color: [number, number, number, number] = [1, 1, 1, 1];
    private spacing: number = 1;
    private chars: string[] = [];
    private readonly colors: Vec4[] = [];
    private readonly indices: number[] = [];
    private readonly vertices: Vec4[] = [];
    private fontInfo: FontInfo = {};
    init() {
        super.init();
        const trs = this.getEntity().get(TRS);
        const x = trs.getPosition().x;
        const y = trs.getPosition().y;
        const scale = trs.getScale().x;
        const spacing = 1;
        this.createABO(ArrayBufferIndex.Position, new Float32Array(0), 4)
        this.createABO(ArrayBufferIndex.Color, new Float32Array(0), 4)
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.color = [1, 1, 1, 1];
        this.spacing = spacing;
        this.chars = [..."Hello world!"];
        this.fontInfo = this.getEntity().get(FontInfoContainer).getFontInfo();
        console.log(this)
    }
    updateChars(chars: string) {
        this.chars.splice(0, this.chars.length, ...chars);
    }
    create(fontInfo: FontInfo, texSize: Vec2) {
        let { x, y, scale, spacing, chars } = this;
        const texHeight = texSize.y;
        const texWidth = texSize.x;
        const ox = x;
        const oy = y;
        this.vertices.splice(0, this.vertices.length);
        const batch = this.vertices;
        for (const c of chars) {
            const ch = fontInfo[c];
            const xpos = x;
            const ypos = y;
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
        this.indices.splice(0, this.indices.length, ...new Array(batch.length).fill(0).map((_, index) => index))
        this.colors.splice(0, this.colors.length, ...new Array(batch.length).fill(0).map(() => new Vec4(this.color[0], this.color[1], this.color[2], this.color[3])));
    }
    draw(mode: number): void {
        this.bind();
        this.create(this.fontInfo, this.getTexture(TextureIndex.Default).getSize());
        this.updateABO(ArrayBufferIndex.Position, flatten(this.vertices));
        this.updateABO(ArrayBufferIndex.Color, flatten(this.colors));
        this.updateEBO(new Uint16Array(this.indices));
        super.draw(mode);
    }

}