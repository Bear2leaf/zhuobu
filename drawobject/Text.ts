import { device } from "../Device.js";
import { FontInfo } from "../renderer/TextRenderer.js";
import Texture from "../Texture.js";
import { Vec4 } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";
import Mesh from "../geometry/Mesh.js";

export default class Text extends DrawObject {
    private readonly x: number;
    private readonly y: number;
    private readonly scale: number;
    private readonly color: [number, number, number, number];
    private readonly spacing: number;
    private readonly chars: string[]
    private readonly originX: number;
    private readonly originY: number;
    constructor(x: number, y: number, scale: number, color: [number, number, number, number], spacing: number, ...chars: string[]) {
        super();
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
    create(texture:Texture, fontInfo: FontInfo) {

        let { x, y, scale, spacing, chars } = this;
        const texSize = texture.getSize();
        const texHeight = texSize.y;
        const texWidth = texSize.x;
        device.gl.activeTexture(device.gl.TEXTURE0);
        const ox = x;
        const oy = y;
        const batch: Vec4[] = [];
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
        const mesh = new Mesh([], new Array(batch.length).fill(0).map((_, index) => index), batch);
        this.mesh = mesh;
    }

}