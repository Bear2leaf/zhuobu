import { FontInfo } from "../renderer/TextRenderer.js";
import { flatten, Vec2, Vec4 } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";
import ArrayBufferObject, { ArrayBufferIndex } from "./ArrayBufferObject.js";
import Texture, { TextureIndex } from "../texture/Texture.js";
import Node from "../structure/Node.js";

export default class Text extends DrawObject {
    private readonly x: number;
    private readonly y: number;
    private readonly scale: number;
    private readonly color: [number, number, number, number];
    private readonly spacing: number;
    private readonly chars: string[]
    private readonly originX: number;
    private readonly originY: number;
    private readonly colors: Vec4[] = [];
    private readonly indices: number[] = [];
    private readonly vertices: Vec4[] = [];
    constructor(gl: WebGL2RenderingContext, texture: Texture, x: number, y: number, scale: number, color: [number, number, number, number], spacing: number, ...chars: string[]) {


        super(gl, texture, new Node(), new Map<number, ArrayBufferObject>(), 0);
        this.createABO(ArrayBufferIndex.Vertices, new Float32Array(0), 4)
        this.createABO(ArrayBufferIndex.Colors, new Float32Array(0), 4)
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.color = color;
        this.spacing = spacing;
        this.chars = chars;
        this.originX = 0;
        this.originY = 0;

    }
    updateChars(chars: string) {
        this.chars.splice(0, this.chars.length, ...chars);
    }
    create(fontInfo: FontInfo) {
        const texture = this.getTexture(TextureIndex.Default);
        const texSize = texture.getSize();
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
    }
    draw(mode: number): void {
        this.updateABO(ArrayBufferIndex.Vertices, flatten(this.vertices));
        this.updateABO(ArrayBufferIndex.Colors, flatten(this.colors));
        this.updateEBO(new Uint16Array(this.indices));
        this.setCount(this.indices.length);
        super.draw(mode);
    }

}