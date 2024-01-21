import { flatten, Vec2, Vec4 } from "../geometry/Vector.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import DrawObject from "../drawobject/DrawObject.js";

export type FontInfo = { [key: string]: { width: number, height: number, x: number, y: number, offsetX: number, offsetY: number } };
export default class Text extends DrawObject {
    private color: [number, number, number, number] = [1, 1, 1, 1];
    private spacing: number = 1;
    private chars: string[] = [];
    private readonly colors: Vec4[] = [];
    private readonly indices: number[] = [];
    private readonly vertices: Vec4[] = [];
    private readonly texcoords: Vec4[] = []
    initContextObjects() {
        super.initContextObjects();
        this.createABO(ArrayBufferIndex.Position, new Float32Array(0), 4)
        this.createABO(ArrayBufferIndex.Color, new Float32Array(0), 4)
        this.createABO(ArrayBufferIndex.TextureCoord, new Float32Array(0), 4);
    }
    updateChars(chars: string) {
        this.chars.splice(0, this.chars.length, ...chars);
    }
    create(fontInfo: FontInfo, textureWidth: number, textureHeight: number) {
        let { x, y } = new Vec2(0, 0);
        const scale = new Vec2(1, 1);
        let { spacing, chars } = this;
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
                new Vec4((ch.x) / textureWidth, (ch.y + ch.height) / textureHeight),
                new Vec4((ch.x + ch.width) / textureWidth, (ch.y) / textureHeight),
                new Vec4((ch.x) / textureWidth, (ch.y) / textureHeight),
                new Vec4((ch.x) / textureWidth, (ch.y + ch.height) / textureHeight),
                new Vec4((ch.x + ch.width) / textureWidth, (ch.y + ch.height) / textureHeight),
                new Vec4((ch.x + ch.width) / textureWidth, (ch.y) / textureHeight)
            ];
            batch.push(...vertices);
            batchTexcoords.push(...texcoords);
        }
        this.indices.splice(0, this.indices.length, ...new Array(batch.length).fill(0).map((_, index) => index))
        this.colors.splice(0, this.colors.length, ...new Array(batch.length).fill(0).map(() => new Vec4(this.color[0], this.color[1], this.color[2], this.color[3])));
    }
    draw(): void {
        this.updateABO(ArrayBufferIndex.Position, flatten(this.vertices));
        this.updateABO(ArrayBufferIndex.Color, flatten(this.colors));
        this.updateABO(ArrayBufferIndex.TextureCoord, flatten(this.texcoords));
        this.updateEBO(new Uint16Array(this.indices));
        this.getRenderingContext().switchBlend(true);
        super.draw();
        this.getRenderingContext().switchBlend(false);
    }
}