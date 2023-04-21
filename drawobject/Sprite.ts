import { flatten, Vec2, Vec4 } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";
import ArrayBufferObject, { ArrayBufferIndex } from "./ArrayBufferObject.js";
import Texture, { TextureIndex } from "../Texture.js";
import { device } from "../device/Device.js";
import Quad from "../geometry/Quad.js";
import Node from "../structure/Node.js";

export default class Sprite extends DrawObject {
    private readonly x: number;
    private readonly y: number;
    private readonly scale: number;
    private readonly originX: number;
    private readonly originY: number;
    constructor(x: number, y: number, scale: number, color: [number, number, number, number], origin: [number, number], imageName: string) {
        super(new Node(), new Map<number, ArrayBufferObject>(), 6);
        this.x = x;
        this.y = y;
        this.scale = scale;
        const spriteTexture = new Texture(device.gl.CLAMP_TO_EDGE, device.gl.CLAMP_TO_EDGE);
        const spriteImage = device.imageCache.get(`static/sprite/${imageName}.png`);
        if (!spriteImage) {
            throw new Error("spriteImage not exist")
        }
        spriteTexture.generate(spriteImage);
        const texSize = spriteTexture.getSize();
        this.textureMap.set(TextureIndex.Default, spriteTexture);
        const quad = new Quad(x, y, texSize.x * scale, texSize.y * scale);
        quad.vertices[1].z = 0;
        quad.vertices[1].w = 1;

        quad.vertices[0].z = 0;
        quad.vertices[0].w = 0;

        quad.vertices[3].z = 1;
        quad.vertices[3].w = 0;

        quad.vertices[2].z = 1;
        quad.vertices[2].w = 1;

        quad.colors.forEach(c => {
            c.x = color[0];
            c.y = color[1];
            c.z = color[2];
            c.w = color[3];
        });


        this.aboMap.set(ArrayBufferIndex.Vertices, new ArrayBufferObject(ArrayBufferIndex.Vertices, flatten(quad.vertices)))
        this.aboMap.set(ArrayBufferIndex.Colors, new ArrayBufferObject(ArrayBufferIndex.Colors, flatten(quad.colors)))
        this.updateEBO(new Uint16Array(quad.indices))
        this.originX = origin[0];
        this.originY = origin[1];

    }
    draw(mode: number): void {
        super.draw(mode);
    }

}