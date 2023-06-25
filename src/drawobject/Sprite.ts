import { flatten, Vec4 } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";
import GLArrayBufferObject from "../contextobject/GLArrayBufferObject.js";
import Texture from "../texture/Texture.js";
import Quad from "../math/Quad.js";
import RenderingContext, { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";

export default class Sprite extends DrawObject {
    private readonly x: number;
    private readonly y: number;
    private readonly scale: number;
    private readonly originX: number;
    private readonly originY: number;
    constructor(gl: RenderingContext, texture: Texture, x: number, y: number, scale: number, color: [number, number, number, number], origin: [number, number]) {
        super(gl, texture, new Map<number, GLArrayBufferObject>(), 6);
        this.x = x;
        this.y = y;
        this.scale = scale;
        const texSize = texture.getSize();
        const quad = new Quad(x, y, texSize.x * scale, texSize.y * scale);
        quad.setZWToTexCoord();
        const vertices:Vec4[] = []
        const colors:Vec4[] = []
        const indices: number[] = []
        quad.appendTo(vertices, colors, indices);

        this.createABO(ArrayBufferIndex.Position, flatten(vertices), 4);
        this.createABO(ArrayBufferIndex.Color, flatten(colors), 4);
        this.updateEBO(new Uint16Array(indices));
        this.originX = origin[0];
        this.originY = origin[1];

    }
    update(): void {
    }
    draw(mode: number): void {
        this.bind();
        super.draw(mode);
    }
}