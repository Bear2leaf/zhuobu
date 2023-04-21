import { FontInfo } from "../renderer/TextRenderer.js";
import { flatten, Vec2, Vec4 } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";
import ArrayBufferObject, { ArrayBufferIndex } from "./ArrayBufferObject.js";
import { device } from "../device/Device.js";
import Texture, { TextureIndex } from "../Texture.js";
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
    readonly colors: Vec4[] = [];
    readonly indices: number[] = [];
    readonly vertices: Vec4[] = [];
    constructor(x: number, y: number, scale: number, color: [number, number, number, number], spacing: number, ...chars: string[]) {
        
        
        super(new Node(), new Map<number, ArrayBufferObject>(), 0);
        this.aboMap.set(ArrayBufferIndex.Vertices, new ArrayBufferObject(ArrayBufferIndex.Vertices, new Float32Array(0)))
        this.aboMap.set(ArrayBufferIndex.Colors, new ArrayBufferObject(ArrayBufferIndex.Colors, new Float32Array(0)))
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.color = color;
        this.spacing = spacing;
        this.chars = chars;
        this.originX = 0;
        this.originY = 0;
        const textTexture = new Texture();
        const fontImage = device.imageCache.get("static/font/boxy_bold_font.png");
        if (!fontImage) {
            throw new Error("fontImage not exist")
        }
        textTexture.generate(fontImage);
        this.textureMap.set(TextureIndex.Default, textTexture);

    }
    updateChars(chars: string) {
        this.chars.splice(0, this.chars.length, ...chars);
    }
    create(fontInfo: FontInfo) {
        const texture = this.textureMap.get(TextureIndex.Default);
        if (!texture) {
            throw new Error("texture not exist")
        }
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
        this.indices.splice(0 , this.indices.length, ...new Array(batch.length).fill(0).map((_, index) => index))
    }
    draw(mode: number): void {
        this.aboMap.get(ArrayBufferIndex.Vertices)!.update(flatten(this.vertices));
        this.aboMap.get(ArrayBufferIndex.Colors)!.update(flatten(this.colors));
        this.updateEBO(new Uint16Array(this.indices));
        this.count = this.indices.length;
        super.draw(mode);
    }

}